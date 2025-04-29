const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMPT_USERNAME,
      pass: process.env.SMPT_PASSWORD,
    }
  });

  const mailOptions = {
    from:  process.env.SMPT_USERNAME,
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
