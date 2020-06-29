const Property = require('../models/property');

module.exports.create = body => {
    return new Promise(( resolve, reject) => {
        Property.create(body,  (err, data) => {
            if (err) return reject(err);
            resolve(convertData(data))
          }
        );
    })
}

module.exports.list = (id) => {
    return new Promise((resolve, reject) => {
        Property.find({ agency: id}, (err, data) => {
            if (err) return reject(err);
                resolve(convertData(data))
          }
        )
    })
}

module.exports.detail = (id) => {
    return new Promise((resolve, reject) => {
        Property.findById( id, (err, data) => {
            if (err) return reject(err);
                resolve(convertData(data))
          }
        )
    })
}

module.exports.update = (id, body) => {
    return new Promise((resolve, reject) => {
            Property.findByIdAndUpdate( id, body, { new : true }, (err, data) => {
                if (err) return reject(err) 
                resolve(convertData(data))
            })
    })
}

module.exports.delete = (id) => {
    return new Promise((resolve, reject) => {
        Property.findByIdAndDelete( id, (err, data) => {
            if (err) return reject(err);
                resolve(convertData(data))
          }
        )
    })
}


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