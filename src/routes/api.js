const express = require("express");
const router = express.Router();
const {authentication} = require("../middlewares/authentication");
const {authorization} = require("../middlewares/authorization");

const {validation} = require("../middlewares/validation");
//region Controllers
//controllers
const userController = require("../controllers/userController");
//endregion


//region Validators
//validators
// const user_validation = require("../middleware/validation/user");
//endregion

//region user
/*
=============================================================================
User routes
=============================================================================
*/
// router.post("/user/password/forget", validator.body(user_validation.forgetPassword), userController.forgetPassword);
// router.post("/user/password/verification", validator.body(user_validation.passwordVerification), userController.passwordVerification);
// router.post("/user/password/reset", auth, userController.resetPassword);
//
// router.post("/user/login", validator.body(user_validation.login), userController.login);
// router.post("/user/logout", auth, userController.logout);
//
// router.post("/user/register", validator.body(user_validation.register), userController.createUser);
// router.post("/user/verification", userController.verifyCode);
// router.post("/user/verification/send", userController.sendVerifyCode);
//
// router.post("/user/info", auth, userController.getInfo);
// router.post("/user/get", validator.body(user_validation.getUser), userController.getUser);
router.post("/user/all", authentication, authorization, validation("addUser", "body"), userController.getAllUsers);
/*
=============================================================================
Xxx routes
=============================================================================
*/


module.exports = router;
