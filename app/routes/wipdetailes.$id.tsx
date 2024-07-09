import { useState } from 'react';
import type { LoaderFunction, ActionFunction } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { useLoaderData, Form } from '@remix-run/react';
import { prisma } from '../../prisma/prismaClient';
import { getSession } from '../session';

// Loader function to fetch WIP details
export const loader: LoaderFunction = async ({ params, request }) => {
  const session = await getSession(request.headers.get('Cookie'));
  const user = session.get('user');
  const wipId = params.id;

  if (!wipId) {
    return redirect("/wip");
  }

  const parsedId = parseInt(wipId, 10);
  if (isNaN(parsedId)) {
    throw new Response("Invalid ID", { status: 400 });
  }

  const wip = await prisma.wip.findUnique({
    where: { id: parsedId },
  });

  if (!wip) {
    return redirect("/wip");
  }

  return json({ wip, user });
};

// Action function to handle WIP deletion
export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  const actionType = formData.get("actionType");

  if (actionType === "delete") {
    const wipId = params.id;
    if (!wipId) return redirect("/wip");

    const parsedId = parseInt(wipId, 10);
    if (isNaN(parsedId)) {
      return new Response("Invalid ID", { status: 400 });
    }

    await prisma.wip.delete({
      where: { id: parsedId },
    });
    return redirect("/wip", {
      status: 303,
      headers: { Location: "/wip" },
    });
  }
  return redirect("/wip");
};

// React component for WIP details
export default function WipDetails() {
  const { wip, user } = useLoaderData<{
    wip: {
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

  const galleryImages = [wip.cover, wip.img1, wip.img2, wip.img3];

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
    <div className="wip-details-container">
      <div className="left-side">
        <div className="gallery-container">
          {galleryImages.length > 1 && (
            <button onClick={handlePrev} className="gallery-button left">
              &lt;
            </button>
          )}
          {galleryImages.length > 0 && (
            <img
              src={`/uploads/${galleryImages[currentIndex]}`}
              alt={`${wip.name} - Image ${currentIndex + 1}`}
            />
          )}
          {galleryImages.length > 1 && (
            <button onClick={handleNext} className="gallery-button right">
              &gt;
            </button>
          )}
        </div>
        <a href={wip.path} className="visit-button">
          Visit WIP
        </a>
        {user?.isAdmin && (
          <Form method="post" action={`/wipdetails/${wip.id}`}>
            <input type="hidden" name="actionType" value="delete" />
            <button type="submit" value="delete" className="delete-button">
              Delete WIP
            </button>
          </Form>
        )}
      </div>
      <div className="right-side">
        <h1>{wip.name}</h1>
        <p>{wip.description}</p>
      </div>
    </div>
  );
}

// Styling links for the page
export function links() {
  return [{ rel: 'stylesheet', href: '/assets/style/projectdetails.css' }];
}
