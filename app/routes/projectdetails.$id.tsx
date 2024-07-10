import { useState } from 'react';
import type { LoaderFunction, ActionFunction } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { useLoaderData, Form } from '@remix-run/react';
import { prisma } from '../../prisma/prismaClient';
import { getSession } from '../session';

// Loader function to fetch project details
export const loader: LoaderFunction = async ({ params, request }) => {
  const session = await getSession(request.headers.get('Cookie'));
  const user = session.get('user');
  const projectId = params.id;

  if (!projectId) {
    return redirect("/projects");
  }

  const parsedId = parseInt(projectId, 10);
  if (isNaN(parsedId)) {
    throw new Response("Invalid ID", { status: 400 });
  }

  const project = await prisma.projects.findUnique({
    where: { id: parsedId },
  });

  if (!project) {
    return redirect("/projects");
  }

  return json({ project, user });
};

// Styling links for the page
export function links() {
  return [{ rel: 'stylesheet', href: '/assets/styles/projectdetails.css' }];
}

// Action function to handle project deletion
export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  const actionType = formData.get("actionType");

  if (actionType === "delete") {
    const projectId = params.id;
    if (!projectId) return redirect("/projects");

    const parsedId = parseInt(projectId, 10);
    if (isNaN(parsedId)) {
      return new Response("Invalid ID", { status: 400 });
    }

    await prisma.projects.delete({
      where: { id: parsedId },
    });
    return redirect("/projects", {
      status: 303,
      headers: { Location: "/projects" },
    });
  }
  return redirect("/projects");
};

// React component for project details
export default function ProjectDetails() {
  const { project, user } = useLoaderData<{
    project: {
      id: number;
      name: string;
      description: string;
      gif: string;
      cover: string;
      img1: string;
      img2: string;
      img3: string;
      path: string;
    };
    user: { email: string, isAdmin: boolean };
  }>();

  // Ensure gif is the first image
  const galleryImages = [project.gif, project.cover, project.img1, project.img2, project.img3];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="project-details-container">
      <div className="left-side">
        <div className="gallery-container">
          {galleryImages.length > 0 && (
            <img
              src={`/uploads/${galleryImages[currentIndex]}`}
              alt={`${project.name} - Image ${currentIndex + 1}`}
            />
          )}
        </div>
        <div className="button-container">
          <button onClick={handlePrev} className="gallery-button left">
            &lt;
          </button>
          <a href={project.path} className="visit-button">
            Visit Project
          </a>
          <button onClick={handleNext} className="gallery-button right">
            &gt;
          </button>
        </div>
        {user?.isAdmin && (
          <Form method="post" action={`/projectdetails/${project.id}`}>
            <input type="hidden" name="actionType" value="delete" />
            <button type="submit" value="delete" className="delete-button">
              Delete Project
            </button>
          </Form>
        )}
      </div>
      <div className="right-side">
        <h1>{project.name}</h1>
        <p>{project.description}</p>
      </div>
    </div>
  );
}
