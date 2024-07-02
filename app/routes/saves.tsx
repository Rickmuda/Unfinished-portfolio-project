import { Link } from "@remix-run/react";
import "../../public/assets/style/saves.css"; // Make sure to import the CSS file

export default function Saves() {
  return (
    <div className="container">
      <div className="buttons">
        <Link to="/aboutme" className="button">
          ABOUT ME
        </Link>
        <Link to="/projects" className="button">
          PROJECTS
        </Link>
        <Link to="/contact" className="button">
          CONTACT
        </Link>
        <Link to="/" className="button">
          W.I.P.
        </Link>
      </div>
      <div className="image-container">
        <img
          src="../../public/assets/image/placeholder.png"
          alt="Placeholder"
        />
      </div>
    </div>
  );
}
