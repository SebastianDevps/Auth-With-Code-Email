import {
	PASSWORD_RESET_REQUEST_TEMPLATE,
	PASSWORD_RESET_SUCCESS_TEMPLATE,
	VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
	const recipient = [{ email }];

	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			subject: "Verifica Tu Cuenta",
			html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
			category: "Verificación",
		});

		console.log("Correo enviado exitosamente", response);
	} catch (error) {
		console.error(`Error al enviar verificacion`, error);
		throw new Error(`Error al enviar el correo de verificacion: ${error}`);
	}
};

export const sendWelcomeEmail = async (email, name) => {
	const recipient = [{ email }];

	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			template_uuid: "d88af8a9-5382-4b53-a3d7-5e8449ee578e",
			template_variables: {
				company_info_name: "Js-webs",
				name: name,
			},
		});

		console.log("Correo de bienvenida enviado exitosamente", response);
	} catch (error) {
		console.error(`Error al enviar welcome email`, error);

		throw new Error(`Error al enviar welcome email: ${error}`);
	}
};

export const sendPasswordResetEmail = async (email, resetURL) => {
	const recipient = [{ email }];

	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			subject: "RESTABLECER CONTRASEÑA",
			html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
			category: "Recuperar Contraseña",
		});
	} catch (error) {
		console.error(`Error al enviar password reset email`, error);

		throw new Error(`Error sending password reset email: ${error}`);
	}
};

export const sendResetSuccessEmail = async (email) => {
	const recipient = [{ email }];

	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			subject: "Restablecimiento de contraseña exitoso",
			html: PASSWORD_RESET_SUCCESS_TEMPLATE,
			category: "Restablecer contraseña",
		});

		console.log("Password reset email sent successfully", response);
	} catch (error) {
		console.error(`Error al enviar Restablecimiento de contraseña al email`, error);

		throw new Error(`Error sending password reset success email: ${error}`);
	}
};