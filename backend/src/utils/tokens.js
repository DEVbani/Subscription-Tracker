import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import env from "../config/env.js";

export function signAccessToken(user) {
  return jwt.sign(
    {
      sub: user._id.toString(),
      email: user.email,
      type: "access",
    },
    env.JWT_ACCESS_SECRET,
    {
      expiresIn: env.ACCESS_TOKEN_EXPIRES_IN,
      issuer: "subscription-tracker",
      audience: "web-app",
    }
  );
}

export function signRefreshToken(user, sessionId) {
  return jwt.sign(
    {
      sub: user._id.toString(),
      sid: sessionId.toString(),
      type: "refresh",
    },
    env.JWT_REFRESH_SECRET,
    {
      expiresIn: env.REFRESH_TOKEN_EXPIRES_IN,
      issuer: "subscription-tracker",
      audience: "web-app",
    }
  );
}

export function verifyAccessToken(token) {
  return jwt.verify(token, env.JWT_ACCESS_SECRET, {
    issuer: "subscription-tracker",
    audience: "web-app",
  });
}

export function verifyRefreshToken(token) {
  return jwt.verify(token, env.JWT_REFRESH_SECRET, {
    issuer: "subscription-tracker",
    audience: "web-app",
  });
}

export function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}