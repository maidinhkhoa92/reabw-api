const Like = require("../models/like");
const _ = require("lodash");

module.exports.create = (body) => {
  return new Promise((resolve, reject) => {
    Like.create(body, (err, data) => {
      if (err) return reject(err);
      resolve(convertData(data));
    });
  });
};

module.exports.detail = (query, isPopulate = false) => {
  return new Promise((resolve, reject) => {
      let user = Like.find(query)
      if (isPopulate) {
        user = Like.find(query).populate('user')
      }
      user.exec((err, data) => {
        if (err) return reject(err);
        const [ value ] = data
        resolve(convertData(value));
      });
  });
};

module.exports.delete = (id) => {
  return new Promise((resolve, reject) => {
    Like.findByIdAndDelete(id, (err, data) => {
      if (err) return reject(err);
      resolve(convertData(data));
    });
  });
};

module.exports.list = query => {
  return new Promise((resolve, reject) => {
    let userQuery = Like.find(query)
    userQuery.exec(query, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(res.map(item => convertData(item)));
    });
  });
};

const convertData = (data, password = true) => {
  var result = data;
  if (data === null || data === undefined) {
    return null;
  }
  if (data.toObject) {
    result = data.toObject();
  }
  result.id = data._id;
  if (password) {
    delete result.password;
  }
  delete result._id;
  delete result.__v;
  return result;
};
