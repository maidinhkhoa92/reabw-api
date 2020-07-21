const { body } = require("express-validator");

module.exports.findOne = [
  body("name")
    .not()
    .isEmpty()
    .withMessage("Name is required"),
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