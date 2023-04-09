const nodeMailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

const transportDetail = smtpTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true, //ssl
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS
}
});

exports.sendEmail =  (email, fullname, subject, message) => {
  const transporter = nodeMailer.createTransport(transportDetail);
  transporter.sendMail(
    {
      from: process.env.EMAIL,
      to: email,
      subject: subject,
      html: `<h1> سلام ${fullname}</h1>
    <p>${message}</P>`,
    },
    (err, info) => {
      if (err) return console.log(err);
      console.log(info);
    }
  );
};
// const transportDetail = smtpTransport({
//   host: "smtp.mail.yahoo.com",
//   service: "yahoo",
//   port: 587,
//   secure: false,
//   auth: {
//     user: "waisalizada35@yahoo.com",
//     pass: "user@kpu2020.com",
//   },
//   debug: true,
//   logger: true,
// });

// exports.sendEmail = (email, fullname, subject, message) => {
//   const transporter = nodeMailer.createTransport(transportDetail);
//   transporter.sendMail(
//     {
//       from: "waisalizada35@yahoo.com",
//       to: email,
//       subject: subject,
//       html: `<h1> سلام ${fullname}</h1>
//     <p>${message}</P>`,
//     },
//     (err, info) => {
//       if (err) return console.log(err);
//       console.log(info);
//     }
//   );
// };
