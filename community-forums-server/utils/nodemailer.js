const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'manojh.moshimoshi@gmail.com',
      pass: 'dnwe dndd oipr xoll',
    }
  });

  const mailOptions = {
    from:  'manojh.moshimoshi@gmail.com',
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
