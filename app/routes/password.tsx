import { Link } from "@remix-run/react";

export default function Saves () {
    return (
        <div>
        <h3>Dit is puur zodat er iets staat.</h3>
        <Link to={"../aboutme"}>ABOUT ME</Link>
        <Link to={"../projects"}>PROJECTS</Link>
        <Link to={"../contact"}>CONTACT</Link>
        </div>
    );
}