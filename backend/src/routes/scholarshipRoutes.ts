import { Hono } from "hono";
import {
  addScholarship,
  deleteScholarship,
  getLatest,
  getNearest,
  getScholarships,
  getStatistics,
  search,
  updateScholarship,
} from "../controllers/scholarshipController";
import { authMiddleware } from "../middlewares/authMiddleware";

export const scholarships = new Hono();

scholarships.use("*", authMiddleware);

scholarships.get("/", getScholarships);
scholarships.get("/nearest", getNearest);
scholarships.get("/latest", getLatest);
scholarships.get("/statistics", getStatistics);
scholarships.get("/search", search);
scholarships.post("/add", addScholarship);
scholarships.patch("/:id", updateScholarship);
scholarships.delete("/:id", deleteScholarship);
