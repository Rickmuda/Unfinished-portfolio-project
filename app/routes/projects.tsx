import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData, Link } from '@remix-run/react';
import { prisma } from '../../prisma/prismaClient'; // Updated relative path
import { getSession } from '../session'; // Updated relative path

import styles from "../../public/assets/style/projects.css";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));
  const user = session.get('user');

  const projects = await prisma.projects.findMany();

  return json({ projects, user });
};

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export default function Projects() {
  const { projects, user } = useLoaderData<{ projects: { id: number; name: string; img: string }[], user: { email: string, isAdmin: boolean } }>();

  const isUser = user && user.email === "your-email@example.com"; // Replace with your email
  const isAdmin = user && user.isAdmin;

  return (
    <div className="projects-container">
      <h1>Projects</h1>
      {(isUser || isAdmin) && (
        <Link to="/addprojects">
          <button>Add New Project</button>
        </Link>
      )}
      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <Link to={`/projectdetails/${project.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <h2>{project.name}</h2>
              <img src={project.img} alt={project.name} className="project-image" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
