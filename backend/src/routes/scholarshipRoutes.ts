import { Hono } from "hono";
import { addScholarship, deleteScholarship, getScholarships, updateScholarship } from "../controllers/scholarshipController";

export const scholarships = new Hono();

scholarships.get("/", getScholarships)
scholarships.post("/add", addScholarship);
scholarships.patch("/:id", updateScholarship)
scholarships.delete("/:id", deleteScholarship)
