import mongoose from "mongoose";
import { io } from "../../index.js";
import getActiveUsersInCity from "../../src/modules/socketIOUser/socket.service.js";

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

missingPersonSchema.post("save", async (doc) => {
  const userSocket = getActiveUsersInCity(doc.city);
  const notificationPromises = userSocket.map(async (user) => {
    await Notification.create({
      title: "New Notification",
      description: `New Missing Person Near ${doc.city} You was added to our Database`,
      user: user.userId, // Use the userId from userSocket
      missingPerson: doc._id,
    });
  });

  // Wait for all notifications to be created
  await Promise.all(notificationPromises);
  
  const socket = userSocket.map((user) => user.socketId);
  io.to(socket).emit("newPost", {
    title: "New post was added to our Database reolad to see the changes",
  });
});
const MissingPerson = mongoose.model("MissingPerson", missingPersonSchema);
export default MissingPerson;
