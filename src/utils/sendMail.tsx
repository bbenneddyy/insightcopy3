import { EmailTemplate } from "@/components/Email/EmailTemplate";
import { render } from "@react-email/render";
import { Resend } from "resend";

interface ISendMail {
  to: string;
  subject: string;
  firstname: string;
  lastname: string;
  text: string;
}

export async function sendMail({ to, subject, firstname, lastname, text }: ISendMail) {
  const plainText = await render(<EmailTemplate
    firstname={firstname}
    lastname={lastname}
    preview={subject}
    text={text}
  />, {
    plainText: true,
  });

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data } = await resend.emails.send({
      from: 'MDCU Insight <no-reply@insight.docchula.com>',
      to: [to],
      subject: subject,
      react: <EmailTemplate
        firstname={firstname}
        lastname={lastname}
        preview={subject}
        text={text}
      />,
      text: plainText,
    });
    console.log("Email sent: ", data);
  } catch (error) {
    console.error("Unable to send email ", error);
  }
}
