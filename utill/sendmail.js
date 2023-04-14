const sgMailer = require('@sendgrid/mail')
const BadRequest = require('../errors/badrequest')

sgMailer.setApiKey(process.env.Send_Grid_Key)


const mailer = async (reciverMail, mailSubject, message) => {

    if (!reciverMail || !mailSubject || !message) {
        throw new BadRequest('Ooops Something Went Wrong')
    }

    try {
        return await sgMailer.send({
            to: reciverMail,
            from: process.env.sender_Mail,
            subject: mailSubject,
            html: message,
        })
    }
    catch (err) {
        return err
    }
  
}

module.exports = mailer