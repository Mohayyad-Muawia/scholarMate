import mongoose from "mongoose";

const Schema = mongoose.Schema;

const scholarshipScheama = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    country: {
      type: String,
    },
    degreeLevel: {
      type: String,
      required: true,
    },
    fundingType: {
      type: String,
      required: true,
    },
    deadline: {
      type: Date,
    },
    resultsDate: {
      type: Date,
    },
    status: {
      type: String,
      required: true,
    },
    link: {
      type: String,
    },
  },
  { timestamps: true }
);

const Scholarship = mongoose.model("Scholarship", scholarshipScheama);

export default Scholarship;
