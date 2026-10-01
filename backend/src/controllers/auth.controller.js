import bcrypt from "bcrypt";
import User from "../models/User.js";
import Session from "../models/Session.js";
import AppError from "../utils/AppError.js";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  hashToken,
} from "../utils/tokens.js";
import { accessCookieOptions, refreshCookieOptions } from "../utils/cookies.js";

function setAuthCookies(res, accessToken, refreshToken) {
  res.cookie("accessToken", accessToken, accessCookieOptions);
  res.cookie("refreshToken", refreshToken, refreshCookieOptions);
}

export async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return next(new AppError("User already exists", 409));
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, passwordHash });

    const session = await Session.create({
      userId: user._id,
      refreshTokenHash: "pending",
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    const refreshToken = signRefreshToken(user, session._id);
    session.refreshTokenHash = hashToken(refreshToken);
    await session.save();

    const accessToken = signAccessToken(user);
    setAuthCookies(res, accessToken, refreshToken);

    res.status(201).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+passwordHash");

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return next(new AppError("Invalid email or password", 401));
    }

    const session = await Session.create({
      userId: user._id,
      refreshTokenHash: "pending",
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    const refreshToken = signRefreshToken(user, session._id);
    session.refreshTokenHash = hashToken(refreshToken);
    await session.save();

    const accessToken = signAccessToken(user);
    setAuthCookies(res, accessToken, refreshToken);

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function me(req, res) {
  res.json({
    success: true,
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    },
  });
}

export async function refresh(req, res, next) {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return next(new AppError("Refresh token missing", 401));
    }

    const payload = verifyRefreshToken(token);

    if (payload.type !== "refresh") {
      return next(new AppError("Invalid refresh token", 401));
    }

    const session = await Session.findOne({
      _id: payload.sid,
      userId: payload.sub,
    });

    if (!session || session.expiresAt < new Date()) {
      return next(new AppError("Session expired", 401));
    }

    if (hashToken(token) !== session.refreshTokenHash) {
      await Session.findByIdAndDelete(session._id);
      return next(new AppError("Refresh token reuse detected", 401));
    }

    const user = await User.findById(payload.sub);

    if (!user) {
      return next(new AppError("User not found", 401));
    }

    const newRefreshToken = signRefreshToken(user, session._id);
    session.refreshTokenHash = hashToken(newRefreshToken);
    session.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await session.save();

    const accessToken = signAccessToken(user);

    setAuthCookies(res, accessToken, newRefreshToken);

    res.json({ success: true });
  } catch {
    next(new AppError("Invalid or expired refresh token", 401));
  }
}

export async function logout(req, res, next) {
  try {
    const token = req.cookies.refreshToken;

    if (token) {
      try {
        const payload = verifyRefreshToken(token);
        await Session.findByIdAndDelete(payload.sid);
      } catch {
        // Clear cookies even if the token is already invalid.
      }
    }

    res.clearCookie("accessToken", { path: "/" });
    res.clearCookie("refreshToken", { path: "/api/auth" });

    res.json({ success: true });
  } catch (error) {
    next(error);
  }
}