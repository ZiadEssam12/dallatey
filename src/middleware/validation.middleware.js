import mongoose from "mongoose";

export const validateID = (value, helper) => {
  if (mongoose.Types.ObjectId.isValid(value)) return true;
  else return helper.message("Invalid ID");
};

const validation = (schema) => {
  return (req, res, next) => {
    // abortEarly: false => return all errors not just the first one
    const data = { ...req.body, ...req.params, ...req.query };
    console.log("input data is:", data);
    const validateResult = schema.validate(data, { abortEarly: false });
    if (validateResult.error) {
      // map the error details to a new array
      const errors = validateResult.error.details.map(
        (object) => object.message
      );
      // and then return the array as a response
      return next(new Error(errors, { cause: 401 }));
    }
    return next();
  };
};

export default validation;
