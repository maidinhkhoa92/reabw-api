const share = require('../../services/share')
const { validationResult } = require("express-validator");

module.exports.count = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).send({ errors: errors.array() });
    return;
  }
  try {
    const data = await share.count(req.query.property);
    res.status(200).send({data})
  } catch (err) {
    next(err);
  }
}

module.exports.create = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).send({ errors: errors.array() });
    return;
  }
  try {
    const existedEmail = await share.detail(req.body.receiveEmail);
    if (!existedEmail) {
      const value = {
        property: req.body.property,
        email: req.body.receiveEmail
      }
      await share.create(value);
    }
    const data = await share.sendEmail(req.body)
    res.status(200).send(data)
  } catch (err) {
    console.log(err)
    next(err);
  }
}
