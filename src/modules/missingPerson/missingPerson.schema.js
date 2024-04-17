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
  city: Joi.string().required(),
  locationOfLoss: Joi.string().required(),
  dateOfLoss: Joi.date().required(),
  description: Joi.string().required(),
  // images: Joi.array().items(Joi.string()).required(),
  additonalInfo: Joi.string(),
  status: Joi.string().valid("missing", "found").required(),
});

export const updateMissingPersonSchema = Joi.object({
  name: Joi.string(),
  gender: Joi.string().valid("male", "female"),
  age: Joi.number().min(0),
  city: Joi.string(),
  locationOfLoss: Joi.string(),
  dateOfLoss: Joi.date(),
  description: Joi.string(),
  images: Joi.array().items(Joi.string()),
  additonalInfo: Joi.string(),
});

export const markAsDoneSchema = Joi.object({
  id: Joi.string().custom(validateID).required(),
});
