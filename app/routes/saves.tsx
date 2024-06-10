import { Link } from "@remix-run/react";

export default function Saves () {
    return (
        <div>
        <h2>Dit is puur zodat er iets staat.</h2>
        <Link to={"../aboutme"}>ABOUT ME</Link>
        <Link to={"../projects"}>PROJECTS</Link>
        <Link to={"../contact"}>CONTACT</Link>
        </div>
    );
}