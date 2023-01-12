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


// send mail with defined transport object
async function sendFormToGmail(mailBody) {
    const {subject, text, body, to } = mailBody
    
    
    transporter.sendMail(mailBody, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
}


module.exports = {
    sendFormToGmail: sendFormToGmail,
}