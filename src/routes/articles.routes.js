import { Router } from "express";
import { createArticle, deleteArticle, getArticleById, getArticles, getMyArticles, updateArticles } from "../controllers/article.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { ownerMiddleware } from "../middlewares/owner.middleware.js";

export const articleRoutes = Router();

articleRoutes.post("/articles", authMiddleware, createArticle);
articleRoutes.get("/articles", authMiddleware, getArticles);
articleRoutes.get("/articles/my", authMiddleware, getMyArticles);
articleRoutes.get("/articles/:id", authMiddleware, getArticleById);
articleRoutes.put("/articles/:id", authMiddleware, adminMiddleware, ownerMiddleware, updateArticles);
articleRoutes.delete("/articles/:id", authMiddleware, ownerMiddleware, deleteArticle);
