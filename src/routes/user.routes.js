import { Router } from "express";
import { getUsers, getUserArticlesAndComments, updateUser, deleteUser } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";

export const userRoutes = Router();

userRoutes.get("/users", authMiddleware, getUsers);
userRoutes.get("/users/:id", authMiddleware, getUserArticlesAndComments);
userRoutes.put("/users/:id", authMiddleware, adminMiddleware, updateUser);
userRoutes.delete("/users/:id", authMiddleware, adminMiddleware, deleteUser);
