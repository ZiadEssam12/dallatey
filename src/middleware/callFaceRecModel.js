import axios from "axios";
import asyncHandler from "../utils/asyncHandler.js";

const callFaceRecModel = (endpoint) => {
  return asyncHandler(async (req, res, next) => {
    const modelResult = await axios.post(
      `http://127.0.0.1:5000/detect/${endpoint}`,
      {
        photo: req.file.path,
      }
    );
    const modelImage = modelResult.data.name;
    if (!modelImage) {
      return next(new Error("Couldn't find any match in our database", 404));
    }
    req.modelResult = modelImage + ".jpg";
    return next();
  });
};
export default callFaceRecModel;
