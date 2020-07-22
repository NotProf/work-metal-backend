const nodemailer = require("nodemailer");
const mailSetting = require('../helpers/mail');


let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: mailSetting.user,
        pass: mailSetting.password,
    },
});

function generateOptions(user) {
    return {
        from: mailSetting.senderName,
        to: user.email,
        subject: mailSetting.subject,
        html: `<h3>Hello ${user.firstname},</h3> 
               <h5>please confirm your account!
               <a href="${mailSetting.domain}${user.activationCode}">Click here</a> 
               </h5><br> 
                     ${mailSetting.domain}${user.activationCode}`,
    }
}

async function sendMail(user) {
    await transporter.sendMail(generateOptions(user));
}

module.exports = {sendMail};
