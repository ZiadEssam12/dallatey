import { Router } from "express";
import * as postController from "./post.controller.js";
import * as postSchema from "./post.schema.js";

const router = Router();
router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPost);

export default router;
