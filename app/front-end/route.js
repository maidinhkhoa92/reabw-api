const express = require("express");
const router = express.Router();
const Token = require("../helper/token");

// user
const user = require("./user");
const userValidate = require("./user/validate");

router.post("/register", userValidate.register, user.register);
router.post("/login", userValidate.login, user.login);
router.post("/forgot-password", userValidate.forgotPassword, user.forgotPassword);
router.post("/reset-password", Token, userValidate.resetPassword, user.resetPassword);

// add agent in agency
router.post("/agency/agent", userValidate.addingAgent, user.addingAgent);

// add property
const property = require("./property")
const propertyValidate = require("./property/validate");
router.post("/agency/property", propertyValidate.create, property.create)
router.get("/agency/:idAgency", property.list)
router.get("/property/:idProperty", property.detail)
router.put("/property/:idProperty", propertyValidate.create, property.update)
router.delete("/property/:idProperty", property.delete)

module.exports = router;
