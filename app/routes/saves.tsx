import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getSession } from "../session";
import "../../public/assets/style/saves.css"; // Make sure to import the CSS file

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const user = session.get("user");
  console.log('User session in loader:', user); // Debug log
  return json({ user });
};

export default function Saves() {
  const { user } = useLoaderData<{ user: { email: string; isAdmin: boolean } | null }>();
  console.log('User data in component:', user); // Debug log

  return (
    <div className="container">
      <div className="buttons">
        <a href="/aboutme" className="button">
          ABOUT ME
        </a>
        <a href="/projects" className="button">
          PROJECTS
        </a>
        <a href="/wip" className="button">
          W.I.P.
        </a>
        <a href="/contact" className="button">
          CONTACT
        </a>

      </div>
      <div className="image-container">
        <img
          src="../../public/assets/image/placeholder.png"
          alt="Placeholder"
        />
      </div>
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
  );
}
