import joi from "joi";
import { validateID } from "../../middleware/validation.middleware";

export const markPostAsSolved = joi.object({
  id: joi.custom(validateID).required(),
});

