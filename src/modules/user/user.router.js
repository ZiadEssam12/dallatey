import { Router } from "express";
import * as userController from "./user.controller.js";
import * as userSchema from "./user.schema.js";
import validation from "../../middleware/validation.middleware.js";
import isAuthenticated from "../../middleware/isAuthenticated.js";
import isAuthorized from "../../middleware/isAuthorized.js";
// ----------------------------------------------------------------------------------------- //
// init express router
const router = Router();

// ----------------------------------------------------------------------------------------- //
// # User APIs
// 1. Sign up
router.post(
  "/signup",
  (req, res, next) => {
    console.log("data from middleware : ", ...req.body);
  },
  validation(userSchema.signUpSchema),
  userController.signup
);

// ----------------------------------------------------------------------------------------- //
// 2. Sign in
router.post(
  "/signin",
  validation(userSchema.signInSchema),
  userController.signin
);

// ----------------------------------------------------------------------------------------- //
// 3. Update Account
router.patch(
  "/",
  isAuthenticated,
  validation(userSchema.updateUserSchema),
  userController.updateAccount
);

// ----------------------------------------------------------------------------------------- //
// 4- delete account
router.delete("/", isAuthenticated, userController.deleteAccount);

// ----------------------------------------------------------------------------------------- //
// 5. Get Logged In User Data

router.get("/", isAuthenticated, userController.getLoggedInUserData);

// ----------------------------------------------------------------------------------------- //
// 6. Get Another User Profile
router.get("/:id", isAuthenticated, userController.getAnotherUserProfile);

// ----------------------------------------------------------------------------------------- //
// 7. update password
router.patch(
  "/password",
  isAuthenticated,
  validation(userSchema.updatePassword),
  userController.updatePassword
);

// ----------------------------------------------------------------------------------------- //
// 8. send OTP
router.post("/sendOTP", validation(userSchema.sendOTP), userController.sendOTP);

// ----------------------------------------------------------------------------------------- //
// 9. verify OTP and reset password
router.patch(
  "/resetPassword",
  validation(userSchema.resetPassword),
  userController.resetPassword
);

// ----------------------------------------------------------------------------------------- //
// 10. set user to admin
router.patch(
  "/admin/:id",
  isAuthenticated,
  isAuthorized("admin"),
  validation(userSchema.setAdmin),
  userController.setAdmin
);

export default router;
