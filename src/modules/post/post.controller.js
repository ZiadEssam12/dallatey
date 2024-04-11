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

export const makePostAsSolved = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({
      success: false,
      message: "Post not found",
    });
  }
  if (post.member !== req.user.id || req.user.role !== "admin") {
    return res.status(401).json({
      success: false,
      message: "You are not authorized to perform this action",
    });
  }
  post.isActive = false;
  await post.save();
  return res.status(200).json({
    success: true,
    data: {
      post,
    },
  });
});

export const updatePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({
      success: false,
      message: "Post not found",
    });
  }
  if (post.member !== req.user.id || req.user.role !== "admin") {
    return res.status(401).json({
      success: false,
      message: "You are not authorized to perform this action",
    });
  }
  post.text = req.body.text;
  await post.save();
  return res.status(200).json({
    success: true,
    data: {
      post,
    },
  });
});
