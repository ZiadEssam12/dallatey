import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: {
      type: String,
      required: true,
    },
    seen: { type: Boolean, default: false },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    missingPerson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MissingPerson",
      required: true,
    },
  },
  { timestamps: true }
);

notificationSchema.query.paginate = function (page) {
  let limit = 5;
  page = page < 1 || !page || isNaN(page) ? 1 : page;
  return this.skip((page - 1) * limit).limit(limit);
};

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
