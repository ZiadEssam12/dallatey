import Joi from "joi";
import { validateID } from "../../middleware/validation.middleware.js";

// fname: { type: String, required: true },
// lname: { type: String, required: true },
// gender: { type: String, enum: ["male", "female"] },
// age: { type: Number, min: 0 },
// city: { type: String },
// locationOfLoss: { type: String },
// dateOfLoss: { type: String },
// description: { type: String },
// images: [{ type: String }],
// status: { type: String },
export const addMissingPersonSchema = Joi.object({
  name: Joi.string().required(),
  gender: Joi.string().valid("male", "female").required(),
  age: Joi.number().min(0).required(),
  locationOfLoss: Joi.string().required(),
  city: Joi.string().required(),
  dateOfLoss: Joi.date().required(),
  description: Joi.string().required(),
  images: Joi.array().items(Joi.string()).messages({
    "any.required": `You should at least provide one image`,
    "array.base": `You should at least provide one image`, // Optional, for clarity
  }),
  status: Joi.string().valid("missing", "found", "done").required(),
  mobileNumber: Joi.string()
    .pattern(/^01[0-2,5]\d{8}$/)
    .required(),
});

export const updateMissingPersonSchema = Joi.object({
  name: Joi.string(),
  gender: Joi.string().valid("male", "female"),
  age: Joi.number().min(0),
  locationOfLoss: Joi.string(),
  city: Joi.string(),
  dateOfLoss: Joi.date(),
  description: Joi.string(),
  images: Joi.array().items(Joi.string()),
  id: Joi.string().custom(validateID).required(),
  mobileNumber: Joi.string()
    .pattern(/^01[0-2,5]\d{8}$/)
    .required(),
});

export const markAsDoneSchema = Joi.object({
  id: Joi.string().custom(validateID).required(),
});

export const matchOneSchema = Joi.object({
  image: Joi.string().required(),
});
