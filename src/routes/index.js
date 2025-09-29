import { Router } from "express";
import { authRouter } from "./auth.routes.js";
import { profileRoutes } from "./profile.routes.js";
import { userRoutes } from "./user.routes.js";
import { articleRoutes } from "./articles.routes.js";

export const routes = Router();

routes.use(authRouter);
routes.use(profileRoutes);
routes.use(userRoutes);
routes.use(articleRoutes);