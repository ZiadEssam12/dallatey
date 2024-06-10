import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user", enum: ["user", "admin"] },
    governorate: { type: String, required: true },
    isActive: { type: Boolean, default: true, enum: [true, false] },
    mobileNumber: { type: String, unique: true },
  },
  { timestamps: true }
);

userSchema.query.paginate = function (page) {
  page = page < 1 || !page || isNaN(page) ? 1 : page;
  const limit = 20;
  const skip = limit * (page - 1);
  return this.skip(skip).limit(limit);
};

const User = mongoose.model("User", userSchema);

export default User;
