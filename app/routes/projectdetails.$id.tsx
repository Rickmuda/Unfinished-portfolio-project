import { useState, useEffect } from 'react';
import type { LoaderFunction, ActionFunction } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { useLoaderData, Form } from '@remix-run/react';
import { prisma } from '../../prisma/prismaClient';

// Loader function to fetch project details
export const loader: LoaderFunction = async ({ params }) => {
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

  return json({ project });
};

// Action function to handle project deletion
export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  const actionType = formData.get("actionType");

  console.log(actionType, formData);
  // return null;

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
    console.log("Project deleted successfully!");
    // Adjust the redirect URL as necessary
    return redirect("/projects", {
      status: 303,
      headers: { Location: "/projects" },
    });
  }
  return redirect("/wip");
};

// React component for project details
export default function ProjectDetails() {
  const { project } = useLoaderData<{
    project: {
      id: number;
      name: string;
      img: string;
      gif?: string;
      description: string;
    };
  }>();

  const images = project.img.split(",").map((image) => image.trim());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const galleryImages = project.gif ? [project.gif, ...images] : images;

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // console.log("Gallery Images:", galleryImages);
    // console.log("Current Image Index:", currentIndex);
    // console.log("Current Image:", galleryImages[currentIndex]);
  }, [currentIndex, galleryImages]);

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
      <h1>{project.name}</h1>
      <div className="gallery-container">
        <button onClick={handlePrev} className="gallery-button left">
          &lt;
        </button>
        <img
          src={`/uploads/${galleryImages[currentIndex]}`}
          alt={project.name}
        />
        <button onClick={handleNext} className="gallery-button right">
          &gt;
        </button>
      </div>
      <p>{project.description}</p>
      <Form
        method="post"
        action={`/projectdetails/${project.id}`}
        // onSubmit={(e) => console.log(e)}
      >
        <input type="hidden" name="actionType" value="delete" />
        <button type="submit" value="delete" className="delete-button">
          Delete Project
        </button>
      </Form>
    </div>
  );
}

// Styling links for the page
export function links() {
  return [{ rel: 'stylesheet', href: '/assets/style/projectdetails.css' }];
}
