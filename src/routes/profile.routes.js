import { Router } from "express";
import { updateProfile, getProfile } from "../controllers/profile.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

export const profileRoutes = Router();

profileRoutes.get("/auth/profile", authMiddleware, getProfile);
profileRoutes.put("/auth/profile", authMiddleware, updateProfile); 