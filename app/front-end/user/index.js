const user = require("../../services/user");
const { validationResult } = require("express-validator");

module.exports.login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).send({ errors: errors.array() });
    return;
  }

  const { email, password } = req.body;
  try {
    const data = await user.login(email, password);
    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
};

module.exports.register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).send({ errors: errors.array() });
    return;
  }

  try {
    const data = await user.register(req.body);
    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
};

module.exports.addingAgent = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).send({ errors: errors.array() });
    return;
  }

  try {
    const { id } = req.decoded;

    let body = {
      ...req.body,
      agency: id,
      type: 'agent'
    };

    const data = await user.register(body);
    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
};

module.exports.update = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).send({ errors: errors.array() });
    return;
  }

  try {
    const { id } = req.params;
    const data = await user.update(id, req.body);
    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
};

module.exports.confirm = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).send({ errors: errors.array() });
    return;
  }

  try {
    const { email, password } = req.body;
    const query = {
      email: email
    }
    const Agent = await user.find(query);

    if(Agent.status) {
      throw ({code: 10})
    }

    const params = {
      password: password,
      status: true
    }
    const data = await user.update(Agent.id, params)
    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
};

module.exports.forgotPassword = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).send({ errors: errors.array() });
    return;
  }

  try {
    const { email } = req.body;

    const data = await user.forgotPassword(email);
    
    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
};

module.exports.resetPassword = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).send({ errors: errors.array() });
    return;
  }

  try {
    const { password } = req.body;
    const { email } = req.decoded;
    const User = await user.find({ email });

    const data = await user.update(User.id, {password});
    
    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
};

module.exports.list = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).send({ errors: errors.array() });
    return;
  }

  try {
    const { id } = req.decoded;

    const query = {
      agency: id,
    };

    const data = await user.list(query);
    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
};