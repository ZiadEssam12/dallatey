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
  post = await post.populate("member", "firstName lastName");
  return res.status(201).json({
    success: true,
    data: {
      post,
    },
  });
});

export const getAllMissingPerson = asyncHandler(async (req, res, next) => {
  // get all the missing person
  // return response
  const missingPersons = await MissingPerson.find();
  return res.status(200).json({
    success: true,
    data: {
      missingPersons,
    },
  });
});

export const getMissingPerson = asyncHandler(async (req, res, next) => {
  // get the missing person by id
  // return response
  const missingPerson = await MissingPerson.findById(req.params.id);
  return res.status(200).json({
    success: true,
    data: {
      missingPerson,
    },
  });
});
