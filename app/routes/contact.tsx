import { Link } from "@remix-run/react";

export default function Saves () {
    return (
        <div>
        <h1>SAVES</h1>
        <Link to={"../aboutme"}>ABOUT ME</Link>
        <Link to={"../projects"}>PROJECTS</Link>
        <Link to={"../contact"}>CONTACT</Link>
        </div>
    );
}