//  importing router fron express
import { Router } from "express";
import * as missingPersonController from "./missingPerson.controller.js";
import * as missingPersonSchema from "./missingPerson.schema.js";
import isAuthenticated from "../../middleware/isAuthenticated.js";
import isAuthorized from "../../middleware/isAuthorized.js";
import validation from "../../middleware/validation.middleware.js";
import isExists from "../../middleware/isExists.js";
import fileUpload from "../../utils/cloudUpload.js";
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
  fileUpload().array("images"),
  validation(missingPersonSchema.addMissingPersonSchema),
  missingPersonController.addMissingPerson
);

router.patch(
  "/:id",
  isAuthenticated,
  isAuthorized("user", "admin"),
  validation(missingPersonSchema.updateMissingPersonSchema),
  isExists,
  missingPersonController.updateMissingPerson
);

router.patch(
  "/done/:id",
  isAuthenticated,
  isAuthorized("user", "admin"),
  validation(missingPersonSchema.markAsDoneSchema),
  isExists,
  missingPersonController.markAsDone
);

router.get(
  "/name",
  isAuthenticated,
  isAuthorized("admin", "user"),
  missingPersonController.getMissingNames
);
router.get("/", isAuthenticated, missingPersonController.getAllMissingPerson);
router.get("/:id", isAuthenticated, missingPersonController.getMissingPerson);

// router.post(
//   "/matchOne",
//   isAuthenticated,
//   isAuthorized("admin", "user"),
//   fileUpload().single("image"),
//   missingPersonController.getMatch
// );

export default router;
