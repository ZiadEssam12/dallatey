import joi from "joi";
import { validateID } from "../../middleware/validation.middleware.js";

export const markNotificationAsReadSchema = joi.object({
  id: joi.string().custom(validateID).required(),
});

export const getNotificationsSchema = joi.object({
  page: joi.number().required(),
});
