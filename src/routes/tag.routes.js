import { Router } from "express";
import { createTag, deleteTag, getTagById, getTags, updateTag } from "../controllers/tags.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js"

export const tagRouter = Router();

tagRouter.post("/tags", authMiddleware, adminMiddleware, createTag);
tagRouter.get("/tags", authMiddleware, getTags);
tagRouter.get("/tags/:id", authMiddleware, getTagById);
tagRouter.put("/tags/:id", authMiddleware, updateTag);
tagRouter.delete("/tags/:id", authMiddleware, adminMiddleware, deleteTag)
