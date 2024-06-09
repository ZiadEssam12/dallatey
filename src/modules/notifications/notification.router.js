import { Router } from "express";
import * as notificationController from "./notification.controller.js";
import * as notificationSchema from "./notification.schema.js";
import isAuthenticated from "../../middleware/isAuthenticated.js";
import isAuthorized from "../../middleware/isAuthorized.js";
import validation from "../../middleware/validation.middleware.js";

const router = Router();

router.get(
  "/",
  isAuthenticated,
  isAuthorized("user", "admin"),
  validation(notificationSchema.getNotificationsSchema),
  notificationController.getNotifications
);

router.patch(
  "/:id",
  isAuthenticated,
  isAuthorized("user", "admin"),
  validation(notificationSchema.markNotificationAsReadSchema),
  notificationController.markNotificationAsRead
);

export default router;
