import joi from "joi";
import { validateID } from "../../middleware/validation.middleware.js";

export const signUpSchema = joi
  .object({
    fullName: joi.string().required(),
    email: joi.string().email().required(),
    mobileNumber: joi
      .string()
      .pattern(/^01[0-2,5]\d{8}$/)
      .required(),
    password: joi.string().min(8).required(),
    confirmPassword: joi
      .string()
      .valid(joi.ref("password"))
      .required()
      .messages({
        "any.only": "confirmPassword must match password",
      }),
    governorate: joi.string().required(),
  })
  .required();

export const signInSchema = joi
  .object({
    email: joi.string().email(),
    password: joi.string().min(8).required(),
    mobileNumber: joi.string().pattern(/^01[0-2,5]\d{8}$/),
  })
  .required();

//   3. update account.
//   - you can update ( email , mobileNumber , recoveryEmail , DOB , lastName , firstName)
//   - if user update the email , mobileNumber make sure that the new data doesn’t conflict with any existing data in your  database
//   - User must be loggedIn
//   - only the owner of the account can update his account data
export const updateUserSchema = joi
  .object({
    fullName: joi.string(),
    email: joi.string().email(),
    mobileNumber: joi.string().pattern(/^01[0-2,5]\d{8}$/),
    password: joi.string().min(8),
    confirmPassword: joi.string().valid(joi.ref("password")),
    governorate: joi.string(),
  })
  .required();

export const updatePassword = joi
  .object({
    newPassword: joi.string().required(),
    confirmNewPassword: joi.string().valid(joi.ref("newPassword")).required(),
  })
  .required();

export const resetPassword = joi
  .object({
    identification: joi.string().required(),
    code: joi.string().required(),
    newPassword: joi.string().min(8).required(),
  })
  .required();

export const sendOTP = joi
  .object({
    identification: joi.string().required(),
  })
  .required();

export const setAdmin = joi
  .object({
    id: joi.string().custom(validateID).required(),
  })
  .required();

export const checkOTP = joi
  .object({
    identification: joi.string().required(),
    code: joi.string().required(),
  })
  .required();
