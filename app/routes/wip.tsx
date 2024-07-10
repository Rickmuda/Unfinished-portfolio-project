import { PrismaClient } from '@prisma/client'; // Ensure correct path to Prisma client
import { getSession } from '../session'; // Ensure correct path to session handling
import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData, Link } from '@remix-run/react';

const prisma = new PrismaClient(); // Initialize Prisma client

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));
  const user = session.get('user');

  const wipProjects = await prisma.wip.findMany();

  return json({ wipProjects, user });
};

export function links() {
  return [{ rel: 'stylesheet', href: '/assets/styles/projects.css' }];
}

export default function WipProjects() {
  const { wipProjects, user } = useLoaderData<{ wipProjects: { id: number; name: string; cover: string }[], user: { email: string, isAdmin: boolean } }>();

  const isUser = user && user.email === "your-email@example.com"; // Replace with your email
  const isAdmin = user && user.isAdmin;

  return (
    <div className="projects-container">
      <h1>WORK IN PROGRESS</h1>
      {(isUser || isAdmin) && (
        <Link to="/addwip">
          <button className='button'>Add New W.I.P.</button>
        </Link>
      )}
      <div className="projects-grid">
        {wipProjects.map((project) => (
          <div key={project.id} className="project-card">
            <Link to={`/wipdetails/${project.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
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
