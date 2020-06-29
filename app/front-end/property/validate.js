const { body } = require("express-validator");

module.exports.create = [
  body("address")
    .not()
    .isEmpty()
    .withMessage("Address is required"),
  body("district")
    .not()
    .isEmpty()
    .withMessage("District is required"),
  body("price")
    .isNumeric()
    .not()
    .isEmpty()
    .withMessage("Price is required"),
  body("area")
    .isNumeric()
    .not()
    .isEmpty()
    .withMessage("Area is required"),
  body("bedRoom")
    .isDecimal()
    .not()
    .withMessage("BedRoom is required"),
  body("bathRoom")
    .isDecimal()
    .not()
    .isEmpty()
    .withMessage("BathRoom is required"),
  body("photos")
    .isArray(),
  body("description")
    .isString(),
  body("kind").isString().isIn(["house", "apartment"]).withMessage("No Kind"),
  body("type").isString().isIn(["sale", "rent"]).withMessage("No Kind"),
];