// app/routes/projects.tsx

import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData, Link } from '@remix-run/react';
import { prisma } from '../../prisma/prismaClient';

export const loader: LoaderFunction = async () => {
  const projects = await prisma.projects.findMany();
  return json({ projects });
};

export default function Projects() {
  const { projects } = useLoaderData<{ projects: { id: number; name: string; img: string }[] }>();

  return (
    <div>
      <h1>Projects</h1>
      <Link to="/addprojects">
        <button>Add New Project</button>
      </Link>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <Link to={`/projectdetails/${project.id}`}>
              <h2>{project.name}</h2>
              <img src={project.img} alt={project.name} style={{ width: '200px', height: 'auto', cursor: 'pointer' }} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
