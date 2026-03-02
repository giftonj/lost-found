const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/new", authController.getSignUpPage);

//create new user
router.post("/new", authController.createUser);

router.get("/", authController.getLoginForm);

//validation
router.post('/', authController.validateUser)

//logout
router.get('/logout', authController.logOutUser);

module.exports = router;
