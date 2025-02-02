import { SendEmailDto } from '../dto/send-email.dto';

export const fillTemplate = (body: SendEmailDto) => {
  return `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Código de Verificación</title>
        </head>
        <body style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
            <h2>Verificación de Cuenta</h2>
            <p>Tu código de verificación es:</p>
            <h1 style="font-size: 24px; color: #2d89ef;">${body.params}</h1>
            <p>Por favor, usa este código para completar tu registro.</p>
        </body>
        </html> 
    `;
};
