import { Router } from "express";
import { register, login, logout } from "../controllers/auth.controller.js";
import { userValidations } from "../middlewares/validations/user.validations.js";
import { validator } from "../middlewares/validator.middleware.js";


export const authRouter = Router();

authRouter.post("/auth/register", userValidations, validator, register);
authRouter.post("/auth/login", login);
authRouter.post("/auth/logout", logout);

