import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String },
    birthday: { type: Date },
    role: { type: String, default: "user" },
    address: {
      street: { type: String },
      city: { type: String },
      governorate: { type: String },
    },
    isActive: { type: Boolean, default: true , enum: [true , false]},
    username: { type: String, unique: true, required: true },
    mobileNumber: { type: String, unique: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
