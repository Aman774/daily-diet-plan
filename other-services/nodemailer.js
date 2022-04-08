const nodemailer = require("nodemailer");
require("dotenv").config();

const emailService = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use SSL

  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnAuthorized: false,
  },
});

module.exports = { emailService };
