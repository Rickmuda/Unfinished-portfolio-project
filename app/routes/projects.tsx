// app/routes/projects.tsx

import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData, Link } from '@remix-run/react';
import { prisma } from '../../prisma/prismaClient';
import styles from '../../public/assets/style/projects.css';

export const loader: LoaderFunction = async () => {
  const projects = await prisma.projects.findMany();
  return json({ projects });
};

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export default function Projects() {
  const { projects } = useLoaderData<{ projects: { id: number; name: string; img: string }[] }>();

  return (
    <div className="projects-container">
      <h1>Projects</h1>
      <Link to="/addprojects">
        <button>Add New Project</button>
      </Link>
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
