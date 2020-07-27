const like = require('../../services/like')
const { validationResult } = require("express-validator");

module.exports.create = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).send({ errors: errors.array() });
    return;
  }
  try {
    const property = { property: req.body.property}
    const user = { user: req.body.user}
    const Exitproperty = await like.detail(property);
    const Exituser = await like.detail(user);
    // if user and property is existed. Delete.
    if (Exitproperty && Exituser) {
      await like.delete(Exitproperty.id)
      res.status(200).send();
    } else {
      const param = await like.create(req.body);
      res.status(200).send(param);
    }
  } catch (err) {
    next(err);
  }
}
module.exports.list = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).send({ errors: errors.array() });
    return;
  }
  try {
      const data = await like.list(req.query)
      res.status(200).send(data);
    } catch (err) {
    next(err);
  }
}
