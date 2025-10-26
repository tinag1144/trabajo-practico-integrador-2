import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { ownerMiddleware } from "../middlewares/owner.middleware.js";
import { addTagToArticle, removeTagFromArticle } from "../controllers/articleTag.controller.js";
import { validator } from "../middlewares/validator.middleware.js";


export const articleTagRoutes = Router();

articleTagRoutes.post("/articles/:articleId/tags/:tagId", authMiddleware, adminMiddleware, ownerMiddleware, articleTagRoutes, validator, addTagToArticle)
articleTagRoutes.delete("/articles/:articleId/tags/:tagId", authMiddleware, adminMiddleware, ownerMiddleware, articleTagRoutes, validator, removeTagFromArticle)