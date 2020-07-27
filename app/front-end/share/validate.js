const { body } = require("express-validator");

module.exports.create = [
  body("receiveEmail")
    .isEmail()
    .withMessage("Invalid format email")
    .not()
    .isEmpty()
    .withMessage("Email is required"),
  body("sendEmail")
    .isEmail()
    .withMessage("Invalid format email")
    .not()
    .isEmpty()
    .withMessage("Email is required"),
  body("message")
    .not()
    .isEmpty()
    .withMessage("Message is required"),
  body("link")
    .not()
    .isEmpty()
    .withMessage("Link is required"),
  body("property")
    .not()
    .isEmpty()
    .withMessage("Property is required"),
];