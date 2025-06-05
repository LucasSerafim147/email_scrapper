require('dotenv').config();
const nodemailer = require('nodemailer');

// Log para verificar variáveis de ambiente
console.log('Variáveis de ambiente:', {
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS,
});

// Criação do transportador de e-mail
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com', // Valor padrão
  port: parseInt(process.env.EMAIL_PORT) || 465, // Converte para número
  secure: (parseInt(process.env.EMAIL_PORT) || 465) === 465, // true para 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  family: 4, // Força IPv4 para evitar ::1
  debug: true, // Habilita logs detalhados
  logger: true, // Exibe logs no console
});

// Função para enviar o e-mail
async function sendEmail() {
  try {
    const info = await transporter.sendMail({
      from: `"Nome do Remetente" <${process.env.EMAIL_USER}>`, // Remetente
      to: 'lucashenrique6y7y@gmail.com', // Destinatário
      subject: 'Email Sender', // Assunto
      text: 'Bem-vindos a qualquer coisa! Lorem ipsum, tamo junto, latim latom.', // Corpo em texto
      html: '<b>Conteúdo do e-mail em HTML</b>', // Corpo em HTML
    });

    console.log('E-mail enviado: %s', info.messageId);
  } catch (error) {
    console.error('Erro ao enviar o e-mail:', error);
  }
}

// Dispara o e-mail
sendEmail();