import "../../public/assets/style/saves.css"; // Make sure to import the CSS file

export default function Saves() {
  return (
    <div className="container">
      <div className="buttons">
        <a href="/aboutme" className="button">
          ABOUT ME
        </a>
        <a href="/projects" className="button">
          PROJECTS
        </a>
        <a href="/contact" className="button">
          CONTACT
        </a>
        <a href="/" className="button">
          W.I.P.
        </a>
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
