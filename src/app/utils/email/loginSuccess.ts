import { env } from "../../../config/env";
import { sendEmail } from "./nodemailer";

interface LoginEmailData {
  name: string;
  date: string;
  time: string;
  email: string;
  device?: string;
}

export const loginSuccessEmail = async (data: LoginEmailData) => {
  const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Hi ${data.name},</h2>

        <p>We’re happy to inform you that your login was successful.</p>

        <p><strong>Login Details:</strong></p>
        <ul>
          <li><b>Date:</b> ${data.date}</li>
          <li><b>Time:</b> ${data.time}</li>
          ${data.device ? `<li><b>Device/Browser:</b> ${data.device}</li>` : ""}
        </ul>

        <p>If this was you, no further action is needed.</p>

        <p style="color: red;">
          If you did NOT log in, please reset your password immediately and contact support.
        </p>

        <p>🔒 Your security is very important to us. Never share your credentials.</p>

        <br />
        <p>Best regards,<br/>Your Company Team</p>
      </div>
    `;

  await sendEmail(data.email, "Login Success", html);
};
