// app/routes/projectdetails.tsx

import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { prisma } from '../../prisma/prismaClient';

export const loader: LoaderFunction = async ({ params }) => {
  const projectId = params.id; // params.id is of type string | undefined
  if (typeof projectId !== 'string') {
    return json({ error: 'Invalid project ID' }, { status: 400 }); // Return an error response if ID is not valid
  }

  const parsedId = parseInt(projectId, 10);
  if (isNaN(parsedId)) {
    return json({ error: 'Invalid project ID format' }, { status: 400 }); // Return an error response if ID is not a valid number
  }

  const project = await prisma.projects.findUnique({
    where: { id: parsedId },
  });

  if (!project) {
    return json({ error: 'Project not found' }, { status: 404 });
  }

  return json({ project });
};
