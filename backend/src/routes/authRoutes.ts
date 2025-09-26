import { Hono } from "hono";
import { login, register } from "../controllers/authController";

export const auth = new Hono();

auth.post("/login", login);

auth.post("/register", register);
