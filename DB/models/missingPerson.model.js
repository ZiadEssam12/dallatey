import mongoose from "mongoose";

const missingPersonSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    gender: { type: String, enum: ["male", "female"] },
    age: { type: Number, min: 0 },
    city: { type: String },
    locationOfLoss: { type: String },
    dateOfLoss: { type: String },
    description: { type: String },
    images: [{ type: String }],
    status: { type: String },
  },
  { timestamps: true }
);

const MissingPerson = mongoose.model("MissingPerson", missingPersonSchema);


export default MissingPerson