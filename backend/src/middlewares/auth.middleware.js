import { verifyAccessToken } from "../utils/tokens.js";
import User from "../models/User.js";
import AppError from "../utils/AppError.js";

export async function requireAuth(req, res, next) {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return next(new AppError("Authentication required", 401));
    }

    const payload = verifyAccessToken(token);

    if (payload.type !== "access") {
      return next(new AppError("Invalid access token", 401));
    }

    const user = await User.findById(payload.sub).select("_id name email");

    if (!user) {
      return next(new AppError("User no longer exists", 401));
    }

    req.user = user;
    next();
  } catch {
    next(new AppError("Invalid or expired access token", 401));
  }
}