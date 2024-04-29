import Notification from "../../../DB/models/notification.model.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const getNotifications = asyncHandler(async (req, res, next) => {
  const { page } = req.query;
  const userNotifications = await Notification.find({
    user: req.user.id,
  }).paginate(page);
  return res.status(200).json({
    success: true,
    data: userNotifications,
  });
});

export const markNotificationAsRead = asyncHandler(async (req, res, next) => {
  const notification = await Notification.findById(req.params.id);
  if (!notification) {
    return next(new Error("Notification not found", 404));
  }
  if (
    notification.user.toString() !== req.user.id &&
    req.user.role !== "admin"
  ) {
    return next(
      new Error("You are not authorized to update this notification", 401)
    );
  }

  notification.seen = true;
  await notification.save();
  return res.status(200).json({
    success: true,
    message: "Notification marked as read",
  });
});
