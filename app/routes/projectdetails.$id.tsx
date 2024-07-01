// app/routes/projectdetails.$id.tsx

import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { prisma } from '../../prisma/prismaClient';

export const loader: LoaderFunction = async ({ params }) => {
  const projectId = params.id;

  if (!projectId) {
    throw new Response('Not Found', { status: 404 });
  }

  const parsedId = parseInt(projectId, 10);
  if (isNaN(parsedId)) {
    throw new Response('Invalid ID', { status: 400 });
  }

  const project = await prisma.projects.findUnique({
    where: { id: parsedId },
  });

  if (!project) {
    throw new Response('Not Found', { status: 404 });
  }

  return json({ project });
};

export default function ProjectDetails() {
  const { project } = useLoaderData<{ project: { id: number; name: string; img: string; gif?: string; description: string } }>();

  return (
    <div>
      <h1>{project.name}</h1>
      <img src={project.img} alt={project.name} style={{ width: '300px', height: 'auto' }} />
      <p>{project.description}</p>
      {project.gif && (
        <img
          src={project.gif}
          alt={project.name}
          style={{ width: '300px', height: 'auto' }}
        />
      )}
    </div>
  );
}
