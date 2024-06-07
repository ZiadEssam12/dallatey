import mongoose from "mongoose";
import { io } from "../../index.js";
import getActiveUsersInCity from "../../src/modules/socketIOUser/socket.service.js";
import Notification from "./notification.model.js";

const missingPersonSchema = new mongoose.Schema(
  {
    name: { type: String },
    gender: { type: String, enum: ["male", "female"] },
    age: { type: Number, min: 0 },
    locationOfLoss: { type: String },
    dateOfLoss: { type: String },
    city: { type: String },
    description: { type: String },
    images: [{ type: String, unique: true }],
    status: { type: String },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    mobileNumber: { type: String },
  },
  {
    timestamps: true,
    strictQuery: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

missingPersonSchema.query.paginate = function (page) {
  page = page < 1 || !page || isNaN(page) ? 1 : page;
  const limit = 20;
  const skip = limit * (page - 1);
  return this.skip(skip).limit(limit);
};

missingPersonSchema.query.search = function (keyword) {
  if (!keyword) {
    return this;
  }
  return this.find({
    name: {
      $regex: keyword,
      $options: "i",
    },
  });
};

missingPersonSchema.post("save", async (doc) => {
  const { city } = doc;
  const userSocket = await getActiveUsersInCity(city);
  const notificationPromises = userSocket.map(async (user) => {
    // console.log(user);
    await Notification.create({
      title: "New Notification",
      description: `New Missing Person in ${city}  was added to our Database`,
      user: user.userId, // Use the userId from userSocket
      missingPerson: doc._id,
    });
  });
  const socketIds = userSocket
    .filter((user) => user.isActive)
    .map((user) => user.socketId);
  io.to(socketIds).emit("missingPerson", {
    title: "New Notification",
    description: `New Missing Person in ${city}  was added to our Database`,
  });
  // Wait for all notifications to be created
  await Promise.all(notificationPromises);
});
const MissingPerson = mongoose.model("MissingPerson", missingPersonSchema);
export default MissingPerson;
