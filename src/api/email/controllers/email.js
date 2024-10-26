const nodemailer = require('nodemailer');

module.exports = {
  async sendEmail(ctx) {
    const { email, subject, message } = ctx.request.body;

    // Configura el transporte de Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Cambia el servicio si usas otro proveedor
      auth: {
        user: process.env.EMAIL_USER, // Lee de .env
        pass: process.env.EMAIL_PASS, // Lee de .env
      },
    });

    // Configura el correo
    const mailOptions = {
      from: process.env.EMAIL_USER, // Tu dirección de correo
      to: [email, "infofayasi@gmail.com"], // Destinatario
      subject: subject,
      text: message,
    };

    try {
      // Envía el correo
      await transporter.sendMail(mailOptions);
      ctx.send({ message: 'Correo enviado con éxito' });
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      ctx.status = 500;
      ctx.send({ message: 'Error al enviar el correo' });
    }
  },
};
