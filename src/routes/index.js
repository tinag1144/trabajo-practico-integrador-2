import { Router } from "express";
import { authRouter } from "./auth.routes.js";
import { profileRoutes } from "./profile.routes.js";

export const routes = Router();

routes.use(authRouter);
routes.use(profileRoutes);