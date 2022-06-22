const nodemail = require('nodemailer');
require('dotenv').config()

    remetente = nodemail.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth:{
            user: process.env.HOST_EMAIL,
            pass: process.env.PASSWORD_EMAIL
        }
    })
    
    function EnviarEmail(destinatario, tituloemail, textoemail){
        const emailenviado = {
            from: `Fazenda Eletrônica ${process.env.HOST_EMAIL}`,
            to: destinatario,
            subject: tituloemail,
            html: textoemail
        }
        
        remetente.sendMail(emailenviado, function(error){
            if(error){
                console.log(error)
            }
        })
    }

module.exports = EnviarEmail;