import { sendEmail } from "./nodemailer";

export const forgetPasswordOtpTemplate = async (
  userName: string,
  subject: string,
  email: string,
  otp: string
) => {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>

<body style="margin:0; padding:0; background:#f4f6f8; font-family: Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding: 20px;">
        
        <table width="600" style="background:#ffffff; border-radius:8px; padding:30px;">
          
          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom:20px;">
              <img src="http://api.hirerise.org/logo.png" width="100" alt="Hire Rise"/>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="color:#333; font-size:16px;">
              <p>Hello <strong>${userName}</strong>,</p>
              <p>
                We received a request to reset your password for your 
                <strong>Hire Rise</strong> account.
              </p>
            </td>
          </tr>

          <!-- OTP Box -->
          <tr>
            <td align="center" style="padding:30px 0;">
              <div style="
                font-size:32px;
                letter-spacing:5px;
                font-weight:bold;
                color:#225ce4;
                background:#f1f5ff;
                display:inline-block;
                padding:15px 30px;
                border-radius:6px;
              ">
                ${otp}
              </div>
              <p style="margin-top:15px; font-size:14px; color:#666;">
                This code will expire in <strong>2 minutes</strong>.
              </p>
            </td>
          </tr>

          <!-- Warning -->
          <tr>
            <td style="font-size:14px; color:#777;">
              <p>
                ⚠️ For your security, never share this OTP with anyone. 
                Hire Rise will never ask for your verification code.
              </p>
              <p>
                If you didn’t request a password reset, you can safely ignore this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top:30px; text-align:center; font-size:14px; color:#999;">
              <p>Regards,<br/>Team <strong>Hire Rise</strong></p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>
`;

  await sendEmail(email, subject, html);
};