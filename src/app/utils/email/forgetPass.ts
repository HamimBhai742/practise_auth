import { sendEmail } from "./nodemailer";

interface ForgotPasswordEmailData {
  name: string;
  email: string;
  resetLink: string;
  expiryMinutes?: number;
}

export const forgotPasswordEmail = async (
  data: ForgotPasswordEmailData
) => {
  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 8px;">
      
      <h2 style="color: #333;">Password Reset Request</h2>

      <p>Hi ${data.name},</p>

      <p>We received a request to reset your password. Click the button below to set a new password:</p>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${data.resetLink}" 
           style="background-color: #e11d48; color: #fff; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
           Reset Password
        </a>
      </div>

      <p>This link will expire in <strong>${data.expiryMinutes || 10} minutes</strong>.</p>

      <p>If you didn’t request a password reset, you can safely ignore this email. Your account remains secure.</p>

      <hr style="margin: 30px 0;" />

      <p style="font-size: 12px; color: #777;">
        For security reasons, never share this link with anyone.
      </p>

      <p style="font-size: 12px; color: #aaa;">
        © ${new Date().getFullYear()} Your Company. All rights reserved.
      </p>
    </div>
  `;

  await sendEmail(data.email, "Reset Your Password", html);
};