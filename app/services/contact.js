"use strict";

const contact = require("../models/contact");
const transporter = require("../helper/nodemailer");
const APP_CONFIG = require("../config/APP_CONFIG");
const _ = require("lodash");
const EMAIL = require("../config/EMAIL");


//create contact
module.exports.create = (body) => {
  return new Promise((resolve, reject) => {
    contact.create(body, (err, data) => {
      if (err) return reject(err);
      resolve(convertData(data));
    });
  });
};
// find One email
module.exports.find = (query, isPopulate = false) => {
  return new Promise((resolve, reject) => {
    let userQuery = contact.findOne({email: query})
    if (isPopulate) {
      userQuery = userQuery.populate('property')
    } 
    userQuery.exec((err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(convertData(res));
    });
  });
};

module.exports.sendEmail = (body, property) => {
  return new Promise((resolve, reject) => {
    let mailOptions = {
      from: APP_CONFIG.adminEmail,
      to: body.email,
      subject: `Property's adress: ${property.address}`,
      html: `Information: ${property.address}`,
    };
    
    // Send email to user
    transporter.sendMail(mailOptions, function (error) {
      if (error) {
        reject({ code: 11 });
        return;
      } 
        // send email to Admin
        const mailOptionToAdmin = {
          from: body.email,
          to: APP_CONFIG.adminEmail,
          subject: "New user",
          html: "222",
        };
        transporter.sendMail(mailOptionToAdmin, function (e, data) {
          if (e) {
            reject({ code: 11 });
            return;
          }
          resolve(convertData(data));
      });
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
