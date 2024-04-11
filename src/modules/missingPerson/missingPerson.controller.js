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

export const updateMissingPerson = asyncHandler(async (req, res, next) => {
  // update the missing person by id
  // return response
  // patams id is the id of the post that contains the missing person so we need to get the missing person id from the post
  const post = await Post.findByIdAndUpdate(req.params.id, req.body.text, {
    new: true,
  });
  // check for the post
  if (!post) {
    return res.status(404).json({
      success: false,
      message: "Post not found",
    });
  }

  // check if the user is the owner of the post or the user is admin
  if (
    post.member.toString() !== req.user._id.toString() ||
    req.user.role !== "admin"
  ) {
    return res.status(403).json({
      success: false,
      message: "You are not authorized to update this post",
    });
  }

  // update the missing person
  const missingPerson = await MissingPerson.findByIdAndUpdate(
    post.missingPerson,
    req.body,
    { new: true }
  );
  post.missingPerson = missingPerson;

  //return the result
  return res.status(200).json({
    success: true,
    data: {
      post,
    },
  });
});
