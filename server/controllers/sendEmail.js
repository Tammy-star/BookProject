var nodemailer = require('nodemailer');

const sendMail = (req, res)=>{
    
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'bookforshabat@gmail.com',
            pass: 'bookshabat'
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        },
     }
    )
        var mailOptions = {
            from: 'bookforshabat@gmail.com',
            to: req.body.mail,
            subject: 'מישהו מעונין בספר שלך',
            text:req.body.text
                
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                throw error
            } else {
                console.log('Email sent: ' + info.response);
                res.send('Email sent: ' + info.response)
            }
        });
   
    }

    module.exports = {
        sendMail
    }
