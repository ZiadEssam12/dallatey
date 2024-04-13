import Joi from "joi";

export const checkUserSocketSchema = Joi.object({
  socketId: Joi.string().required(),
});
