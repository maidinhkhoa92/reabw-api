const property = require('../../services/property')
const { validationResult } = require('./validate')

module.exports.create = async( req, res ) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   res.status(401).send({ errors: errors.array() });
    //   return;
    // }
    try {
        const data = await property.create(req.body);
        res.status(200).send(data);
      } catch (err) {
        next(err);
      }
}

module.exports.list = async( req, res ) => {
  const id = req.params.idAgency
  try {
      const data = await property.list(id);
      res.status(200).send(data);
    } catch (err) {
      next(err);
    }
}

module.exports.detail = async( req, res ) => {
  const id = req.params.idProperty
  try {
      const data = await property.detail(id);
      res.status(200).send(data);
    } catch (err) {
      next(err);
    }
}

module.exports.update = async( req, res ) => {
  const id = req.params.idProperty
  const body = req.body
  try {
      const data = await property.update(id, body);
      res.status(200).send(data);
    } catch (err) {
      next(err);
    }
}

module.exports.delete = async( req, res ) => {
  const id = req.params.idProperty
  try {
      const data = await property.delete(id);
      res.status(200).send(data);
    } catch (err) {
      next(err);
    }
}