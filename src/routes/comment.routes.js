import { Router } from "express";
import { createComment, deleteComment, getCommentsFromArticle, getMyComments, updateComment } from "../controllers/comments.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";

export const commentRouter = Router();

commentRouter.post("/comments", authMiddleware, createComment)
commentRouter.get("/comments/article/:articleId", authMiddleware, getCommentsFromArticle)
commentRouter.get("/comments/my", authMiddleware, getMyComments)
commentRouter.put("/comments/:id", authMiddleware, adminMiddleware, updateComment)
commentRouter.delete("/comments/:id", authMiddleware, adminMiddleware, deleteComment)