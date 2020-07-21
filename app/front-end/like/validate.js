const { body } = require("express-validator");

module.exports.create = [
  body("user")
    .not()
    .isEmpty()
    .withMessage("User is required"),
  body("property")
    .not()
    .isEmpty()
    .withMessage("Property is required"),
];