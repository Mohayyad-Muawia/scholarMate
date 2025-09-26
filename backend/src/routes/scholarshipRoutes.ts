import { Hono } from "hono";
import {
  addScholarship,
  deleteScholarship,
  getLatest,
  getNearest,
  getScholarships,
  updateScholarship,
} from "../controllers/scholarshipController";

export const scholarships = new Hono();

scholarships.get("/", getScholarships);
scholarships.get("/nearest", getNearest);
scholarships.get("/latest", getLatest);
scholarships.post("/add", addScholarship);
scholarships.patch("/:id", updateScholarship);
scholarships.delete("/:id", deleteScholarship);
