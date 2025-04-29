const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: '587',
    secure: false,
    auth: {
      user: 'manojh.moshimoshi@gmail.com',
      pass: 'dnwe dndd oipr xoll',
    },
  });

  const mailOptions = {
    from: `Commuity Forum <${process.env.SMPT_USERNAME}>`,
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
