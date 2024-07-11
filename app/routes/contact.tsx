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
          <h2 className="contactme">Contact Me</h2>
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
          <button className="sendbutton" type="submit">Send</button>
        </Form>
      </div>
      <div className="social-media-container">
        <div className="social-media-links">
          <h2>My social media</h2>
          <a href="https://twitter.com/Rick_rickerd" target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-twitter"></i>
          </a>

          <a href="https://www.instagram.com/rick_muda/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>

          <a href="https://www.tiktok.com/@rick_muda" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-tiktok"></i>
          </a>

          <a href="https://www.youtube.com/channel/UCHSimkVEkXs0Xp1U4nInA0w" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-youtube"></i>
          </a>

          <a href="https://www.linkedin.com/in/rick-ambergen-30b73a29a/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin"></i>
          </a>

          <a href="https://github.com/MudaIsCarry" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i>
          </a>

          <a href="https://codepen.io/mudaiscarry" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-codepen"></i>
          </a>

          <a href="mailto:rickmudaportfolio@gmail.com" target="_blank" rel="noopener noreferrer">
            <i className="fas fa-envelope"></i>
          </a>

          <a href="https://open.spotify.com/user/rick_rickerd_rickman" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-spotify"></i>
          </a>

          <a href="https://steamcommunity.com/id/rick_muda/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-steam"></i>
          </a>

          <a href="https://dsc.bio/MudaIsCarry" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-discord"></i>
          </a>
          
          <a href="https://www.twitch.tv/mudaiscarry" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitch"></i>
          </a>





        </div>
      </div>
    </div>
  );
}
