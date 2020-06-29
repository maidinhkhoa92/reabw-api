const property = require('../../services/property')
const { validationResult } = require("express-validator");

module.exports.create = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).send({ errors: errors.array() });
    return;
  }
  try {
    // get id of agent
    const { id } = req.decoded;

    const params = {
      ...req.body,
      user: id // add user in property
    }

    const data = await property.create(params);
    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
}

module.exports.list = async (req, res, next) => {
  try {
    const data = await property.list(req.query);
    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
}

module.exports.detail = async (req, res, next) => {
  try {
    // get property id
    const { id } = req.params

    const data = await property.detail(id);
    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
}

module.exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await property.update(id, req.body);
    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
}

module.exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params
    const data = await property.delete(id);
    res.status(200).send({ message: 'Successfully'});
  } catch (err) {
    next(err);
  }
}