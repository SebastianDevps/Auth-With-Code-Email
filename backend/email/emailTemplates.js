export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verifique su correo electrónico</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #007BFF, #0056b3); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Verifica Tu Cuenta</h1>
  </div>
  <div style="background-color: #f0f0f0; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.15);">
    <p>Hola,</p>
    <p>¡Gracias por registrarte! Tu código de verificación es:</p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #007BFF;">{verificationCode}</span>
    </div>
    <p>Ingresa este código en la página de verificación para completar tu registro.</p>
    <p>Este código caducará en 15 minutos por razones de seguridad.</p>
    <p>Si no creaste una cuenta con nosotros, ignora este correo electrónico.</p>
    <p>SebastianDevp,<br>Desarrollador Fullstack</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cambio de Contraseña Exitoso</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #007BFF, #0056b3); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Cambio de Contraseña Exitoso</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hola,</p>
    <p>Te escribimos para confirmar que tu contraseña ha sido restablecida exitosamente.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #007BFF; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        ✓
      </div>
    </div>
    <p>Si no solicitaste este cambio de contraseña, por favor contacta a nuestro equipo de soporte de inmediato.</p>
    <p>Por razones de seguridad, te recomendamos que:</p>
    <ul>
      <li>Utilices una contraseña fuerte y única</li>
      <li>Habilites la autenticación de dos factores si está disponible</li>
      <li>Evites usar la misma contraseña en múltiples sitios</li>
      <li>Cambia tus contraseñas periodicamente</li>
    </ul>
    <p>Gracias por ayudarnos a mantener tu cuenta segura.</p>
    <p>SebastianDevp,<br>Desarrollador Fullstack</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>Este es un mensaje automático, por favor no respondas a este correo.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Restablecer Tu Contraseña</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #007BFF, #0056b3); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Restablecimiento de Contraseña</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hola,</p>
    <p>Hemos recibido una solicitud para restablecer tu contraseña. Si no realizaste esta solicitud, por favor ignora este correo electrónico.</p>
    <p>Para restablecer tu contraseña, haz clic en el botón a continuación:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" style="background-color: #007BFF; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Restablecer Contraseña</a>
    </div>
    <p>Este enlace caducará en 1 hora por razones de seguridad.</p>
    <p>SebastianDevp,<br>Desarrollador Fullstack</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>Este es un mensaje automático, por favor no respondas a este correo.</p>
  </div>
</body>
</html>
`;