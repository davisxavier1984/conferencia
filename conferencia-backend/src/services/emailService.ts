import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Cria um transporter para envio de emails
// Por padrão, usa Ethereal (emails falsos para testes)
// Para usar email real, configure as variáveis de ambiente
export async function createEmailTransporter() {
  // Se não houver credenciais configuradas, cria conta de teste no Ethereal
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log('⚠️  Credenciais de email não configuradas. Criando conta de teste no Ethereal...');
    const testAccount = await nodemailer.createTestAccount();

    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  }

  // Usa as credenciais configuradas
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

interface SendConfirmationEmailParams {
  to: string;
  name: string;
  accessCode: string;
}

export async function sendConfirmationEmail({ to, name, accessCode }: SendConfirmationEmailParams) {
  try {
    const transporter = await createEmailTransporter();

    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || '"10ª Conferência Municipal de Saúde" <noreply@conferencia.com>',
      to,
      subject: 'Confirmação de Inscrição - 10ª Conferência Municipal de Saúde',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #2563eb; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background-color: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
            .code-box { background-color: #1e40af; color: white; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 3px; border-radius: 8px; margin: 20px 0; }
            .info { background-color: #dbeafe; padding: 15px; border-left: 4px solid #2563eb; margin: 20px 0; }
            .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>10ª Conferência Municipal de Saúde</h1>
            </div>
            <div class="content">
              <h2>Olá, ${name}!</h2>
              <p>Sua inscrição foi realizada com sucesso! 🎉</p>

              <div class="info">
                <p><strong>📌 Importante:</strong> Guarde seu código de acesso para consultar seu certificado posteriormente.</p>
              </div>

              <p>Seu código de acesso é:</p>
              <div class="code-box">
                ${accessCode}
              </div>

              <p>Com este código você poderá:</p>
              <ul>
                <li>Consultar seu certificado após o evento</li>
                <li>Verificar o status da sua inscrição</li>
                <li>Acessar informações sobre o evento</li>
              </ul>

              <p>Nos vemos na conferência!</p>

              <div class="footer">
                <p>Este é um e-mail automático. Por favor, não responda.</p>
                <p>© ${new Date().getFullYear()} 10ª Conferência Municipal de Saúde</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        Olá, ${name}!

        Sua inscrição foi realizada com sucesso!

        Seu código de acesso é: ${accessCode}

        Guarde este código para consultar seu certificado posteriormente.

        Nos vemos na conferência!

        ---
        Este é um e-mail automático. Por favor, não responda.
        © ${new Date().getFullYear()} 10ª Conferência Municipal de Saúde
      `,
    });

    console.log('✉️  Email enviado com sucesso:', info.messageId);

    // Se estiver usando Ethereal, mostra o link para visualizar o email
    if (process.env.EMAIL_HOST === 'smtp.ethereal.email' || !process.env.EMAIL_USER) {
      console.log('🔗 Visualize o email em:', nodemailer.getTestMessageUrl(info));
    }

    return {
      success: true,
      messageId: info.messageId,
      previewUrl: nodemailer.getTestMessageUrl(info),
    };
  } catch (error) {
    console.error('❌ Erro ao enviar email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    };
  }
}
