import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, { expiresIn: "15d" });

  const isProd = ENV_VARS.NODE_ENV === "production";
  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    sameSite: isProd ? "none" : "lax",
    httpOnly: true,
    secure: isProd,
  });

  return token;
};
