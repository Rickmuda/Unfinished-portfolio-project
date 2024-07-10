import nodemailer from "nodemailer";

export const sendEmail = async (name: string, email: string, message: string) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.SMTP_USER,
    subject: `Contact Form Submission from ${name}`,
    text: message,
    html: `<p>You have a new contact form submission</p>
           <p><strong>Name: </strong> ${name}</p>
           <p><strong>Email: </strong> ${email}</p>
           <p><strong>Message: </strong> ${message}</p>`,
  };

  await transporter.sendMail(mailOptions);
};
