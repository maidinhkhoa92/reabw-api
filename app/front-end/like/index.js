const like = require('../../services/like')
const { validationResult } = require("express-validator");

module.exports.create = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).send({ errors: errors.array() });
    return;
  }
  try {
    const data = {
      property: req.body.property, 
      user: req.query.user
    }
    console.log(data)
    // const data = await like.create(req.body);
    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
}

module.exports.list = async (req, res, next) => {
  try {
    const data = await like.list(req.query);
    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
}

module.exports.detail = async (req, res, next) => {
  try {
    // get like id
    const { id } = req.params
    // ser user to populate
    const isUser = req.query.user
    const data = await like.detail(id, isUser);
    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
}

module.exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await like.update(id, req.body);
    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
}

module.exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params
    const data = await like.delete(id);
    res.status(200).send({ message: 'Successfully'});
  } catch (err) {
    next(err);
  }
}