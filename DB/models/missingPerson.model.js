import mongoose from "mongoose";
import { io } from "../../index.js";

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

missingPersonSchema.post("save", function (doc) {
  // After a document is saved, emit the event to all connected clients
  io.emit("newPost", {
    title: "New post was added to our Database reolad to see the changes",
  });
});
const MissingPerson = mongoose.model("MissingPerson", missingPersonSchema);
export default MissingPerson;
