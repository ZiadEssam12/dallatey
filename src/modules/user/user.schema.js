import joi from "joi";

export const signUpSchema = joi
  .object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    email: joi.string().email().required(),
    mobileNumber: joi
      .string()
      .pattern(/^01[0-2,5]\d{8}$/)
      .required(),
    password: joi.string().min(8).required(),
    gender: joi.string().valid("male", "female").required(),
    birthday: joi.date().required(),
    address: joi
      .object({
        street: joi.string().required(),
        city: joi.string().required(),
        governorate: joi.string().required(),
      })
      .required(),
    username: joi.string().required(),
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
    firstName: joi.string(),
    lastName: joi.string(),
    email: joi.string().email(),
    mobileNumber: joi.string().pattern(/^01[0-2,5]\d{8}$/),
    password: joi.string().min(8),
    gender: joi.string().valid("male", "female"),
    birthday: joi.date(),
    address: joi.object({
      street: joi.string(),
      city: joi.string(),
      governorate: joi.string(),
    }),
    username: joi.string(),
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
