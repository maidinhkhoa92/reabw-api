const { body } = require("express-validator");

module.exports.login = [
  body("email")
    .isEmail()
    .withMessage("Invalid format email")
    .not()
    .isEmpty()
    .withMessage("Password is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 chars long")
    .not()
    .isEmpty()
    .withMessage("Password is required")
];

module.exports.register = [
  body("fName")
    .not()
    .isEmpty()
    .withMessage("First name is required"),
  body("lName")
    .not()
    .isEmpty()
    .withMessage("Last name is required"),
  body("telephone")
    .not()
    .isEmpty()
    .withMessage("Telephone is required"),
  body("email")
    .isEmail()
    .withMessage("Invalid format email")
    .not()
    .isEmpty()
    .withMessage("Email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 chars long")
    .not()
    .isEmpty()
    .withMessage("Password is required"),
  body("type")
    .not()
    .isEmpty()
    .withMessage("This user must be agency")
];

module.exports.addingAgent = [
  body("fName")
    .not()
    .isEmpty()
    .withMessage("First name is required"),
  body("lName")
    .not()
    .isEmpty()
    .withMessage("Last name is required"),
  body("telephone")
    .not()
    .isEmpty()
    .withMessage("Telephone is required"),
  body("email")
    .isEmail()
    .withMessage("Invalid format email")
    .not()
    .isEmpty()
    .withMessage("Email is required")
];

module.exports.forgotPassword = [
  body("email")
    .isEmail()
    .withMessage("Invalid email")
    .not()
    .isEmpty()
    .withMessage("Email is required"),
];

module.exports.resetPassword = [
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 chars long")
    .not()
    .isEmpty()
    .withMessage("Password is required")
];
