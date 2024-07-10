import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData, Link } from '@remix-run/react';
import { prisma } from '../../prisma/prismaClient';
import { getSession } from '../session';

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));
  const user = session.get('user');

  const projects = await prisma.projects.findMany();

  return json({ projects, user });
};

export function links() {
  return [{ rel: 'stylesheet', href: '/assets/style/projects.css' }];
}

export default function Projects() {
  const { projects, user } = useLoaderData<{ projects: { id: number; name: string; cover: string; gif: string }[], user: { email: string, isAdmin: boolean } }>();

  const isAuthenticated = user !== undefined;
  const isUser = isAuthenticated && user.email === "your-email@example.com"; // Replace with your email
  const isAdmin = isAuthenticated && user.isAdmin;

  return (
    <div className="projects-container">
      <h1>Projects</h1>
      {isAuthenticated && (isUser || isAdmin) && (
        <Link to="/addprojects">
          <button className="button">Add New Project</button>
        </Link>
      )}
      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <Link
              to={`/projectdetails/${project.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <h2>{project.name}</h2>
              <div className="project-image-container">
                <img
                  src={`/uploads/${project.cover}`}
                  alt={project.name}
                  className="project-image"
                />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
