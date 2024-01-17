const nodemailer = require("nodemailer");

let transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "99b526ae614c16",
      pass: "b8acbb8dc65efc"
    }
  });

  module.exports = {
    transport
};