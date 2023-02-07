const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const sendEmail = async options => {
  const transporter = nodemailer.createTransport(
    smtpTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    })
  );

  const mailOptions = {
    from: 'theericfrost <theericfrost@mail.ru>',
    to: options.email,
    subject: options.subject,
    text: options.message
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
