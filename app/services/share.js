"use strict";

const share = require("../models/share");
const transporter = require("../helper/nodemailer");
const APP_CONFIG = require("../config/APP_CONFIG");
const _ = require("lodash");
const EMAIL = require("../config/EMAIL");


//create share
module.exports.create = (body) => {
  return new Promise((resolve, reject) => {
    share.create(body, (err, data) => {
      if (err) return reject(err);
      resolve(convertData(data));
    });
  });
};
// find One email
module.exports.detail = (email) => {
  return new Promise((resolve, reject) => {
    const query = {
      email
    }
    share.findOne(query, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(convertData(res));
    });
  });
};

// count
module.exports.count = (propertyId) => {
  return new Promise((resolve, reject) => {
    const query = {
      property: propertyId
    }
    share.count(query, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      console.log(res)
      resolve(res);
    });
  });
};

module.exports.sendEmail = (body) => {
  return new Promise((resolve, reject) => {
    let mailOptions = {
      from: body.sendEmail,
      to: body.receiveEmail,
      subject: `aaaaa`,
      html: body.link,
    };
    
    // Send email to user
    transporter.sendMail(mailOptions, function (error) {
      if (error) {
        reject({ code: 11 });
        return;
      } 
      resolve(convertData(body));
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
