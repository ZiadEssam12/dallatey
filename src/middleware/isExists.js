import MissingPerson from "../../DB/models/missingPerson.model.js";
import asyncHandler from "../utils/asyncHandler.js";

const isExists = asyncHandler(async (req, res, next) => {
  const missingPerson = await MissingPerson.findById(req.params.id);
  if (!missingPerson) {
    return res.status(404).json({
      success: false,
      message: "Missing person not found",
    });
  }
  if (
    missingPerson.addedBy.toString() !== req.user.id.toString() && req.user.role !== "admin"
  ) {
    return res.status(403).json({
      success: false,
      message: "You are not authorized to update this missing person",
    });
  }
  req.missingPerson = missingPerson;
  return next();
});

export default isExists;
