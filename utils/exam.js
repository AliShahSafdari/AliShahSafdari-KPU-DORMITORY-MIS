const nodeMailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

let transport = nodeMailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true, //ssl
    auth: {
        user: "waisalizada3@zohomail.com",
        pass:"bank7349"
    }
});

var mailOptions = {
    from: "waisalizada3@zohomail.com",
    to: "waisalizada35@gmail.com",
    subject: "Subject",
    html: "lsdl"
};

transport.sendMail(mailOptions,(err,info)=>{
    if (err) {
        return console.log(err);
    }
    console.log(info);
})

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

// // exports.sendEmail = (email, fullname, subject, message) => {
// //   const transporter = nodeMailer.createTransport(transportDetail);
// //   transporter.sendMail(
// //     {
// //       from: "waisalizada35@yahoo.com",
// //       to: email,
// //       subject: subject,
// //       html: `<h1> سلام ${fullname}</h1>
// //     <p>${message}</P>`,
// //     },
// //     (err, info) => {
// //       if (err) return console.log(err);
// //       console.log(info);
// //     }
// //   );
// // };

// const transporter = nodeMailer.createTransport(transportDetail);
// const options ={
//     from:"waisalizada35@yahoo.com",
//     to:"waisalizada35@gmail.com",
//     subject:"hello",
//     text:"lsfjlsflsfl",
// }

// transporter.sendMail(options,(err,info)=>{
//     if(err) return console.log(err);
//     console.log(info);
// })