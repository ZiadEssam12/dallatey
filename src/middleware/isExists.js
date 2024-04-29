import MissingPerson from "../../DB/models/missingPerson.model.js";
import asyncHandler from "../utils/asyncHandler.js";

const isExists = asyncHandler(async (req, res, next) => {
  const missingPerson = await MissingPerson.findById(req.params.id);
  if (!missingPerson) {
    return next(new Error("Missing person not found!", 404));
  }
  if (
    missingPerson.addedBy.toString() !== req.user.id.toString() &&
    req.user.role !== "admin"
  ) {
    return next(
      new Error("You are not authorized to update this missing person", 401)
    );
  }
  req.missingPerson = missingPerson;
  return next();
});

export default isExists;
