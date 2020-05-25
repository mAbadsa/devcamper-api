const nodemailer = require("nodemailer");

const sendEmail = async ({ email, subject, message }) => {
  // create reusable transporter object using the default SMTP transport
  const transporter = await nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.STMP_PORT,
    auth: {
      user: process.env.STMP_EMAIL,
      pass: process.env.STMP_PASSWORD,
    },
  });

  const messageConfig = {
    from: `${process.env.FROM_NAME} <${process.env.STMP_EMAIL}>`,
    to: email,
    subject: subject,
    text: message,
  };

  const info = await transporter.sendMail(messageConfig);

  console.log('Message sent: s%', info.messageId);
};

module.exports = sendEmail;
