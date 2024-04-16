import mongoose from "mongoose";
import { io } from "../../index.js";
import getActiveUsersInCity from "../../src/modules/socketIOUser/socket.service.js";
import Notification from "./notification.model.js";

const missingPersonSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    gender: { type: String, enum: ["male", "female"], required: true },
    age: { type: Number, min: 0, required: true },
    city: { type: String, required: true },
    locationOfLoss: { type: String, required: true },
    dateOfLoss: { type: String, required: true },
    description: { type: String, required: true },
    images: [
      {
        path: { type: String, required: true },
      },
    ],
    status: { type: String, required: true },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    additionalInfo: { type: String },
  },
  { timestamps: true, strictQuery: true }
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
  const userSocket = await getActiveUsersInCity(doc.city);
  console.log(userSocket);
  const notificationPromises = userSocket.map(async (user) => {
    await Notification.create({
      title: "New Notification",
      description: `New Missing Person Near ${doc.city} You was added to our Database`,
      user: user.userId, // Use the userId from userSocket
      missingPerson: doc._id,
    });
    io.to(user.socketId).emit("newPost", {
      title: `New Missing Person Near ${doc.city} You was added to our Database`,
    });
  });

  // Wait for all notifications to be created
  await Promise.all(notificationPromises);
});
const MissingPerson = mongoose.model("MissingPerson", missingPersonSchema);
export default MissingPerson;
