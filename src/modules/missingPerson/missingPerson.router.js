//  importing router fron express
import { Router } from "express";
import * as missingPersonController from "./missingPerson.controller.js";
import * as missingPersonSchema from "./missingPerson.schema.js";
import isAuthenticated from "../../middleware/isAuthenticated.js";
import isAuthorized from "../../middleware/isAuthorized.js";
import validation from "../../middleware/validation.middleware.js";
// ------
// --------
// ----------
// --------
// ------
// --------------------------------------------------------------- separate the routes from the controller ---------------------------------------------------------------
const router = Router();
router.post(
  "/",
  isAuthenticated,
  isAuthorized("user", "admin"),
  validation(missingPersonSchema.addMissingPersonSchema),
  missingPersonController.addMissingPerson
);

router.patch(
  "/:id",
  isAuthenticated,
  isAuthorized("user", "admin"),
  validation(missingPersonSchema.updateMissingPersonSchema),
  missingPersonController.updateMissingPerson
);


export default router;
