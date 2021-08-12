const nodemailer = require('nodemailer');

const send = async ({ to, subject = 'Registro Correcto!',html }) => {
    try {
        const transporter = nodemailer.createTransport({
            service: process.env.CORREO_SERVICE,
            auth: {
                user: process.env.CORREO_USER,
                pass: process.env.CORREO_PASS
            },
            tls: { rejectUnauthorized: false }
        });
        const mail = {
            from: '<noreply>',
            to,
            subject,
            html
        }
        const envio = await transporter.sendMail(mail);
        return envio.messageId
    } catch (error) {
        return error
    }
}

module.exports = {send}