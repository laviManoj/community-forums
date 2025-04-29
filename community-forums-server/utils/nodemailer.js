const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    }
  });

  const mailOptions = {
    from:  process.env.GMAIL_USER,
    to: options.email,
    subject: options.subject,
    text: options.text,
    html: options.html,
  };

  transporter.sendMail(mailOptions, function (err, res) {
    if (err) {
      console.log(err.message);
    }
  });
};

module.exports = sendEmail;
