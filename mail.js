const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
       ciphers:'SSLv3'
    },
    auth: {
        user: 'lpiemetu@outlook.fr',
        pass: 'reddit34'
    }
});

 mailOptions = {
  from: 'lpiemetu@outlook.fr',
  to: "",
  subject: 'Password forgot',
  text: ''
};

const sendMail = (res) => transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    res.status(500).send(error.message)
  } else {
    res.status(200).send(info.response);
  }
});

module.exports.sendMail = sendMail
module.exports.mailOptions = mailOptions
