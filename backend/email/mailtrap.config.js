import{ MailtrapClient } from 'mailtrap';
import dotenv from "dotenv";

dotenv.config();

const TOKEN = process.env.MAIL_TOKEN;

export const mailtrapClient = new MailtrapClient({
    token: TOKEN,
});

export const sender = {
    email: "mailtrap@demomailtrap.com",
    name: "SebastianDevp",
};

// const recipients = [
//     {
//         email: "juan_guerra82231@elpoli.edu.co",
//     }
// ];

// client
//     .send({
//         from: sender,
//         to: recipients,
//         subject: "You are awesome!",
//         text: "Congrats for sending test email with Mailtrap!",
//         category: "Integration Test",
//     })
//     .then(console.log, console.error);