
 Envío de Correos de Verificación con Mailtrap en un Proyecto MERN

Este módulo está diseñado para enviar correos electrónicos de verificación en un proyecto MERN (MongoDB, Express, React, Node.js). Utiliza Mailtrap para el envío de correos electrónicos y JWT (JSON Web Tokens) para la generación de códigos de verificación.

#### Funcionalidades

- **Envío de Correos**: Envía correos electrónicos desde una dirección remitente especificada a una dirección destinataria.
- **Plantilla de Correo**: Usa una plantilla HTML para incluir un código de verificación en el cuerpo del correo.
- **Autenticación**: Utiliza JWT para generar y verificar códigos de verificación.
- **Manejo de Errores**: Incluye manejo de errores para capturar y registrar cualquier problema durante el envío del correo.

#### Uso

1. **Configuración**: Asegúrate de configurar tus archivos `.env` para el backend y frontend. 

   - **Backend (puerto 5000)**:
     - `MAIL_TOKEN `: Token de Mailtrap.
     - `JWT_SECRET`: Secreto para firmar los tokens JWT.
     - `MONGO_URL`: Url para la base de datos mongo.
     - `PORT = 5000`: Puerto donde se lanza el servidor del backend
     - `NODE_ENV = development`: Estado de desarrollo, debes cambiarlo cuando este en produccion

   - **Frontend (puerto 3000)**:
     - Configura el frontend para interactuar con el backend en el puerto 5000.

2. **Función de Envío**: Para utilizar el módulo, primero configura el cliente de Mailtrap. Luego, llama a la función `sendVerificationEmail` proporcionando los parámetros necesarios:

   - **`sender`**: Dirección de correo electrónico del remitente.
   - **`recipient`**: Dirección de correo electrónico del destinatario.
   - **`verificationToken`**: Código de verificación generado con JWT.

   ```javascript
   sendVerificationEmail({
     sender: 'tu-email@dominio.com',
     recipient: 'destinatario@dominio.com',
     verificationToken: '123456'
   });
   ```

 Requisitos

- **Node.js**: Asegúrate de tener Node.js instalado.
- **Mailtrap**: Configura las credenciales de Mailtrap en tu archivo `.env`.
- **JWT**: Asegúrate de tener un secreto JWT configurado en tu archivo `.env`.

Configuración del Entorno

- **Backend**: Ejecuta el backend en el puerto `5000`.
- **Frontend**: Ejecuta el frontend en el puerto `3000`.

 Licencia

Este proyecto está licenciado bajo la [Licencia MIT](LICENSE).

---
