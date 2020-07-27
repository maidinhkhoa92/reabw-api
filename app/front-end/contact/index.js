const contact = require('../../services/contact')
const property = require('../../services/property')
const { validationResult } = require("express-validator");

module.exports.findOne = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).send({ errors: errors.array() });
    return;
  }
  try {
    // email of Consumer is existed?
    const data = await contact.find(req.body.email);
    // get Property 
    const Property = await property.detail(req.body.property, true);

    // send to Email of User
    await contact.sendEmail(Property.user, Property);
    if (!data) {
        const value = await contact.create(req.body);
        res.status(200).send(value);
    } else {res.status(200).send(data);}
  } catch (err) {
    next(err);
  }
}
