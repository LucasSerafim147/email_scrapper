require('dotenv').config({ path: './.env' }); // Ajuste o caminho se necessário
const { fetchData } = require ('../scraper/app.js');
const nodemailer = require('nodemailer');





// Criação do transportador de e-mail com base nas variáveis de ambiente
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true, // true para 465, false para outras portas
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
 
});

// Função para enviar o e-mail
async function sendEmail() {
  try {

    
    const result = await fetchData()
    console.log("Resultado do scraping:", result);

 if (!result || !result.success) {
      throw new Error(`Falha no scraping: ${result?.error || 'Nenhum dado retornado'}`);
    }
    const textContent = `Frases coletadas de ${result.url}:\n\n${result.data
      .map(
        (item, index) =>
          `${index + 1}. "${item.texto}"\n   - Autor: ${item.autor}\n   - Tags: ${item.tags.join(', ')}\n`
      )
      .join('\n')}`;
    const htmlContent = `
      <h3>Frases coletadas de ${result.url}</h3>
      <ul>
        ${result.data
          .map(
            (item, index) =>
              `<li>
                <strong>${index + 1}. "${item.texto}"</strong><br>
                Autor: ${item.autor}<br>
                Tags: ${item.tags.join(', ')}
              </li>`
          )
          .join('')}
      </ul>
    `;

    const mailOptions = {
      from: `"Lucas" <${process.env.EMAIL_USER}>`, // Remetente
      to: 'lucashenrique6y7y@gmail.com', // Lista de destinatários
      subject: 'email sender com scrapper', // Assunto
      text: textContent, // Corpo do e-mail em texto simples
      html: htmlContent, // Corpo do e-mail em HTML
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('E-mail enviado: %s', info.messageId);
  } catch (error) {
    console.error('Erro ao enviar o e-mail:', error);
  }

}

// Dispara o e-mail
sendEmail();
