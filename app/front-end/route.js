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

// Agency get list and create agent
router.get("/agency/agent", Token, user.list);
router.post("/agency/agent", Token, userValidate.addingAgent, user.addingAgent);

// add property
const property = require("./property")
const propertyValidate = require("./property/validate");
router.post("/property", Token, propertyValidate.create, property.create)
router.get("/property", property.list)
router.get("/property/:id", property.detail)
router.put("/property/:id", Token, propertyValidate.create, propertyValidate.create, property.update)
router.delete("/property/:id", Token, propertyValidate.create, property.delete)

const dialogflow = require("./dialogflow");
router.post("/dialogflow", dialogflow);

// add property
const property = require("./property")
const propertyValidate = require("./property/validate");
router.post("/agency/property", propertyValidate.create, property.create)
router.get("/agency/:idAgency", property.list)
router.get("/property/:idProperty", property.detail)
router.put("/property/:idProperty", propertyValidate.create, property.update)
router.delete("/property/:idProperty", property.delete)

module.exports = router;
