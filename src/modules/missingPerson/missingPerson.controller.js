import MissingPerson from "../../../DB/models/missingPerson.model.js";
import Post from "../../../DB/models/post.model.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const addMissingPerson = asyncHandler(async (req, res, next) => {
  // check if the person is already exists or not by checking the model for the same person
  // TODO
  // data was checked in the
  // create a new person
  // create new post with person Id
  // return response
  // create the missing person
  //   return res.json(req.body);
  const person = await MissingPerson.create(req.body);
  let post = await Post.create({
    missingPerson: person,
    text: req.body.additonalInfo,
    member: req.user._id,
  });
  post = await post.populate("member" , "firstName lastName");
  return res.status(201).json({
    success: true,
    data: {
      post,
    },
  });
});
