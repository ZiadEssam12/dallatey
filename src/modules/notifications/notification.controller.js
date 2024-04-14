import asyncHandler from "../../utils/asyncHandler.js";

export const getNotifications = asyncHandler(async (req, res, next) => {
  const userNotifications = await Notification.find({ userId: req.user.id });
  return res.status(200).json({
    success: true,
    data: userNotifications,
  });
});

export const markNotificationAsRead = asyncHandler(async (req, res, next) => {
  const notification = await Notification.findById(req.params.id);
  if (!notification) {
    return res.status(404).json({
      success: false,
      message: "Notification not found",
    });
  }
  if (
    notification.userId.toString() !== req.user.id &&
    req.user.role !== "admin"
  ) {
    return res.status(403).json({
      success: false,
      message: "You are not authorized to mark this notification as read",
    });
  }

  notification.seen = true;
  await notification.save();
  return res.status(200).json({
    success: true,
    message: "Notification marked as read",
  });
});
