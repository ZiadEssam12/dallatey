import { Router } from "express";
import * as postController from "./post.controller.js";
import * as postSchema from "./post.schema.js";
import validation from "../../middleware/validation.middleware.js";

const router = Router();
router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPost);
router.patch(
  "/:id",
  validation(postSchema.solvedPosts),
  postController.makePostAsSolved
);


export default router;
