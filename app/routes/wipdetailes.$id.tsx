// app/routes/wipdetails.$id.tsx

import React, { useState, useEffect } from 'react';
import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { prisma } from '../../prisma/prismaClient';

export const loader: LoaderFunction = async ({ params }) => {
  const wipId = params.id;

  if (!wipId) {
    throw new Response('Not Found', { status: 404 });
  }

  const parsedId = parseInt(wipId, 10);
  if (isNaN(parsedId)) {
    throw new Response('Invalid ID', { status: 400 });
  }

  const wip = await prisma.wip.findUnique({
    where: { id: parsedId },
  });

  if (!wip) {
    throw new Response('Not Found', { status: 404 });
  }

  return json({ wip });
};

export default function WipDetails() {
  const { wip } = useLoaderData<{
    wip: { id: number; name: string; img: string; gif?: string; description: string };
  }>();

  const images = wip.img.split(',').map((image) => image.trim()); // Ensure each image path is trimmed
  const galleryImages = wip.gif ? [wip.gif, ...images] : images;

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    console.log('Gallery Images:', galleryImages); // Add this line
    console.log('Current Image Index:', currentIndex);
    console.log('Current Image:', galleryImages[currentIndex]);
  }, [currentIndex, galleryImages]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="project-details-container">
      <h1>{wip.name}</h1>
      <div className="gallery-container">
        <button onClick={handlePrev} className="gallery-button left">
          &lt;
        </button>
        <img src={`/uploads/${galleryImages[currentIndex]}`} alt={wip.name} />
        <button onClick={handleNext} className="gallery-button right">
          &gt;
        </button>
      </div>
      <p>{wip.description}</p>
    </div>
  );
}

export function links() {
  return [{ rel: 'stylesheet', href: '/assets/style/projectdetails.css' }];
}
