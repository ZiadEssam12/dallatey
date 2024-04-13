import { Router } from "express";
import * as socketController from "./socket.controller.js";
import * as socketSchema from "./socket.schema.js";
import isAuthenticated from "../../middleware/isAuthenticated.js";
import isAuthorized from "../../middleware/isAuthorized.js";
import validation from "../../middleware/validation.middleware.js";

const router = Router();

router.post(
  "/",
  isAuthenticated,
  isAuthorized("user", "admin"),
  validation(socketSchema.checkUserSocketSchema),
  socketController.checkUserSocket
);

export default router;
