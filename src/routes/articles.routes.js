import { Router } from "express";
import { createArticle, deleteArticle, getArticleById, getArticles, getMyArticles, updateArticles } from "../controllers/article.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { ownerMiddleware } from "../middlewares/owner.middleware.js";
import { validator } from "../middlewares/validator.middleware.js";
import { articleValidations } from "../middlewares/validations/article.validations.js";

export const articleRoutes = Router();

articleRoutes.post("/articles", authMiddleware, articleValidations, validator, createArticle);
articleRoutes.get("/articles", authMiddleware, getArticles);
articleRoutes.get("/articles/my", authMiddleware, getMyArticles);
articleRoutes.get("/articles/:id", authMiddleware, getArticleById);
articleRoutes.put("/articles/:id", authMiddleware, adminMiddleware, ownerMiddleware, updateArticles);
articleRoutes.delete("/articles/:id", authMiddleware, adminMiddleware, ownerMiddleware, articleValidations, validator, deleteArticle);
