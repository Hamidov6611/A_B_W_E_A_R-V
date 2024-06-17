const nodeMailer = require("nodemailer")

class MailService {
    constructor() {
        this.transporter = nodeMailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

    async sendMail(mail, activationLink) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: mail,
            subject: `Activation account link ${activationLink}`,
            text: "",
            html: `
                <div>
                    <h1>Activate your account</h1>
                    <a href="${activationLink}">Activate</a>
                </div>
            `
        })

    }
}

module.exports = new MailService()