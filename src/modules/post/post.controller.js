import Post from "../../../DB/models/post.model.js";
import asyncHandler from "../../../src/utils/asyncHandler.js";

export const getAllPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find()
    .populate("member", "firstName lastName")
    .populate("missingPerson");
  return res.status(200).json({
    success: true,
    data: {
      posts,
    },
  });
});

export const getPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id)
    .populate("member", "firstName lastName")
    .populate("missingPerson");
  return res.status(200).json({
    success: true,
    data: {
      post,
    },
  });
});
