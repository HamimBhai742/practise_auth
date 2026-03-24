import nodemailer from "nodemailer";
import { env } from "../../../config/env";

export const sendEmail = async (
  to: string,
  subject: string,
  html: string,
  text?: string,
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: env.email,
      pass: env.password,
    },
  });
  const mailOptions = {
    from: env.email,
    to,
    subject,
    html,
    text,
  };
  
  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log(info);
      console.log("Email sent: " + info.response);
    }
  });
};
