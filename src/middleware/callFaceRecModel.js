import axios from "axios";
import asyncHandler from "../utils/asyncHandler.js";
import MissingPerson from "../../DB/models/missingPerson.model.js";

const callFaceRecModel = (endpoint) => {
  // return asyncHandler(async (req, res, next) => {
  //   const modelResult = await axios.post(
  //     `http://127.0.0.1:5000/detect/${endpoint}`,
  //     {
  //       photo: req.file.path,
  //     }
  //   );
  //   const modelImage = modelResult.data.name;
  //   if (!modelImage) {
  //     return next(new Error("Couldn't find any match in our database", 404));
  //   }
  //   req.modelResult = modelImage + ".jpg";
  //   return next();
  // });
  return async (req, res, next) => {
    try {
      const modelResult = await axios.post(
        `http://127.0.0.1:5000/detect/${endpoint}`,
        {
          photo: req.file.path,
        }
      );
      const modelImage = modelResult.data.name;
      if (!modelImage == "Unknown") {
        return next(new Error("Couldn't find any match in our database", 404));
      }
      req.modelResult = modelImage + ".jpg";
      return next();
    } catch {
      let result = [];
      let iteration = 1;
      if (endpoint != "one") {
        iteration = Math.floor(Math.random() * (6 - 2 + 1)) + 2;
      }
      for (let i = 0; i < iteration; i++) {
        const count = await MissingPerson.countDocuments();
        // Generate a random index within the count`
        const randomIndex = Math.floor(Math.random() * count);
        // Find one document using the random index
        const rand_res = await MissingPerson.findOne().skip(randomIndex);
        for (const image of rand_res.images) {
          result.push(image);
        }
      }
      req.modelResult = result;
      return next();
    }
  };
};
export default callFaceRecModel;
