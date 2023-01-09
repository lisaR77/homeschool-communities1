const nodemailer = require('nodemailer');
require('dotenv').config()

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    // port: 587,
    // secure: false, // true for 465, false for other ports
    auth: {
        user: 'zain.techling@gmail.com', // generated ethereal user
        pass: process.env.EMAIL_ACCESS_CODE // generated ethereal password
    }
});

let mailOptions1 = {
    from: 'zain.techling@gmail.com', // sender address
    to: 'zaynsheikhofficial@gmail.com',// list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: '<b>Hello world?</b>' // html body
};

let mailOptions2 = {
    from: 'zain.techling@gmail.com', // sender address
    to: 'zaynsheikhofficial@gmail.com',// list of receivers
    subject: 'Hello 2 ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: '<b>Hello world?</b>' // html body
};

let mailOptions3 = {
    from: 'zain.techling@gmail.com', // sender address
    to: 'zaynsheikhofficial@gmail.com',// list of receivers
    subject: 'Hello 424 ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: '<b>Hello world?</b>' // html body
};
// send mail with defined transport object
async function sendFormToGmail(mailBody) {
    transporter.sendMail(mailBody, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
}


module.exports = {
    sendFormToGmail: sendFormToGmail,
    form1 : mailOptions1,
    form2 : mailOptions2,
    form3 : mailOptions3,
}