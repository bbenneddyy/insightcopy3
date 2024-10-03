import nodemailer from "nodemailer";
import { render } from '@react-email/render';
import { EmailTemplate } from "@/components/Email/EmailTemplate";

interface ISendMail {
  to: string;
  subject: string;
  firstname: string;
  lastname: string;
  text: string;
}

export async function sendMail({ to, subject, firstname, lastname, text }: ISendMail) {
  const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;

  const transport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    }
  });
  try {
    await transport.verify();
  } catch (error) {
    console.error("Unable to verify email ", error);
    return;
  }

  try {
    const emailHtml = render(<EmailTemplate
      firstname={firstname}
      lastname={lastname}
      preview={subject}
      text={text}
    />);
    const result = await transport.sendMail({
      from: SMTP_EMAIL,
      to,
      subject,
      html: emailHtml,
    });
    console.log("Email sent: ", result.response)
  } catch (error) {
    console.error("Unable to send email ", error);
  }
}
