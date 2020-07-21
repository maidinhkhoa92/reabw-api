const contact = require('../../services/contact')
const { validationResult } = require("express-validator");

module.exports.findOne = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).send({ errors: errors.array() });
    return;
  }
  try {
    const exisEmail = await contact.find(req.body.email, req.query);
    if (!exisEmail) {
        const data = await contact.create(req.body);
        return res.status(200).send(data);
    } 
    await contact.sendEmail(req.body, exisEmail.property);
    res.status(200).send(exisEmail);
  } catch (err) {
    next(err);
  }
}
