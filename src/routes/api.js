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
router.post("/user/add", authentication, authorization, validation("addUser", "body"), userController.addUser);
router.get("/user/all", authentication, authorization, userController.getAllUsers);

/*
=============================================================================
Xxx routes
=============================================================================
*/


module.exports = router;
