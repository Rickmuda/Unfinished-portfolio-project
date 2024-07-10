import { LinksFunction, ActionFunction, json } from "@remix-run/node";
import { useActionData, Form } from "@remix-run/react";
import { sendEmail } from "../utils/mailer";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: "/assets/styles/contact.css" },
    {
      rel: "stylesheet",
      href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css",
    },
  ];
};

type ActionData = {
  success: boolean;
  error?: string;
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  try {
    await sendEmail(name, email, message);
    return json<ActionData>({ success: true });
  } catch (error) {
    console.error(error);
    return json<ActionData>({ success: false, error: "Failed to send email" });
  }
};

export default function Contact() {
  const actionData = useActionData<ActionData>();

  return (
    <div className="contact-container">
      <div className="form-container">
        <Form method="post" className="contact-form">
          <h2>Contact Me</h2>
          {actionData?.success ? (
            <p>Email sent successfully!</p>
          ) : (
            actionData?.error && <p>{actionData.error}</p>
          )}
          <label>
            Name:
            <input type="text" name="name" required />
          </label>
          <label>
            Email:
            <input type="email" name="email" required />
          </label>
          <label>
            Message:
            <textarea name="message" required />
          </label>
          <button type="submit">Send</button>
        </Form>
      </div>
      <div className="social-media-container">
        <div className="social-media-links">
          <h2>Follow Me</h2>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i>
          </a>
        </div>
      </div>
    </div>
  );
}
