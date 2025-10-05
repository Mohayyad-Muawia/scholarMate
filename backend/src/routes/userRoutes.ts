import { Hono } from "hono";
import {
  deleteUser,
  getUser,
  resetPassword,
  sendReport,
  updateUser,
} from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";

export const user = new Hono();

user.use("*", authMiddleware);

user.get("/:id", getUser);
user.post("/report", sendReport);
user.patch("/:id", updateUser);
user.patch("pass/:id", resetPassword);
user.delete("/:id", deleteUser);
