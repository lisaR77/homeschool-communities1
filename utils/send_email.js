const nodemailer = require('nodemailer');
require('dotenv').config()

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: "smtp.office365.com",  
    secureConnection: true,
    port: 587,
    auth: {
        user: 'lisa@homeschoolcommunities.org', // generated ethereal user
        pass: 'lisa_12345' // generated ethereal password
    },
    tls: {
        ciphers:'SSLv3'
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