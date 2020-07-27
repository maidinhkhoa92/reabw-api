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
router.put("/agency/agent/:id", Token, userValidate.addingAgent, user.update)
router.delete("/agency/agent/:id", Token, user.delete)


// add property
const property = require("./property")
const propertyValidate = require("./property/validate");
router.post("/property", Token, propertyValidate.create, property.create)
router.get("/property", property.list)
router.get("/property/:id", property.detail)
router.put("/property/:id", Token, propertyValidate.create, property.update)
router.delete("/property/:id", Token, property.delete)

// contact
const contact = require("./contact");
const contactValidate = require("./contact/validate");
router.post("/contact", contactValidate.findOne, contact.findOne)

// add like
const like = require("./like")
const likeValidate = require("./like/validate");
router.post("/like", Token, likeValidate.create, like.create)
router.get("/like", like.list)

// add share
const share = require("./share")
const shareValidate = require("./share/validate");
router.get("/share", share.count)
router.post("/share", shareValidate.create, share.create)



const dialogflow = require("./dialogflow");
router.post("/dialogflow", dialogflow);

module.exports = router;
