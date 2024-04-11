import mongoose from "mongoose";

const missingPersonSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    gender: { type: String, enum: ["male", "female"], required: true },
    age: { type: Number, min: 0, required: true },
    city: { type: String, required: true },
    locationOfLoss: { type: String, required: true },
    dateOfLoss: { type: String, required: true },
    description: { type: String, required: true },
    images: [{ type: String, required: true }],
    status: { type: String, required: true },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    additionalInfo: { type: String },
  },
  { timestamps: true }
);

const MissingPerson = mongoose.model("MissingPerson", missingPersonSchema);

export default MissingPerson;
