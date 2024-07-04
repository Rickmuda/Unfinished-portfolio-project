import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getSession } from "../session";
import "../../public/assets/style/saves.css"; // Make sure to import the CSS file
import { useState } from "react"; // Import useState hook

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const user = session.get("user");
  console.log('User session in loader:', user); // Debug log
  return json({ user });
};

export default function Saves() {
  const { user } = useLoaderData<{ user: { email: string; isAdmin: boolean } | null }>();
  console.log('User data in component:', user); // Debug log

  // State to track last hovered button
  const [lastHoveredButton, setLastHoveredButton] = useState<string | null>(null);

  // Function to handle mouse enter event
  const handleMouseEnter = (buttonName: string) => {
    setLastHoveredButton(buttonName);
  };

  return (
    <div className="container">
      <div className="content">
        <div className="buttons">
          <a href="/aboutme" className="button" onMouseEnter={() => handleMouseEnter("A little bit about who I am and what I like to do. ")}>
            ABOUT ME
          </a>
          <a href="/projects" className="button" onMouseEnter={() => handleMouseEnter("The projects I have worked on / created.")}>
            PROJECTS
          </a>
          <a href="/wip" className="button" onMouseEnter={() => handleMouseEnter("The projects I am currently working on.")}>
            W.I.P.
          </a>
          <a href="/contact" className="button" onMouseEnter={() => handleMouseEnter("Most of my social media and ways to contact me.")}>
            CONTACT
          </a>
        </div>
        <div className="image-container">
          <img className="me-gif"
            src="../../public/assets/image/me.gif"
            alt="Placeholder"
          />
          <p className="hovered-text">{lastHoveredButton || '-'}</p>
        </div>
      </div>
      <div className="auth-link-container">
        {!user ? (
          <a href="login" className="auth-link">
            Login
          </a>
        ) : (
          <a href="logout" className="auth-link">
            Logout
          </a>
        )}
      </div>
    </div>
  );
}
