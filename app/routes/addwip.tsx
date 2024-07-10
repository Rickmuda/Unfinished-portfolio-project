import React, { useState } from 'react';
import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { prisma } from '../../prisma/prismaClient';
import path from 'path';
import fs from 'fs/promises';
import { mkdirSync, existsSync } from 'fs';

const getSession = async (request) => {
  // Dummy implementation of session check
  const cookie = request.headers.get("Cookie");
  if (!cookie) return null;

  // You can use your session management logic here to return session
  // For demonstration, assuming if cookie exists, user is authenticated
  return { userId: 1 };
};

const isAuthenticated = async (request) => {
  const session = await getSession(request);
  return session && session.userId;
};

export const loader: LoaderFunction = async ({ request }) => {
  const authenticated = await isAuthenticated(request);
  if (!authenticated) {
    return redirect('/wip');
  }
  return null; // User is authenticated, continue to the page
};

export const action: ActionFunction = async ({ request }) => {
  const authenticated = await isAuthenticated(request);
  if (!authenticated) {
    return redirect('/wip');
  }

  const formData = await request.formData();
  const name = formData.get('name') as string;
  const category = formData.get('category') as string;
  const description = formData.get('description') as string;
  const cover = formData.get('cover') as File;
  const gif = formData.get('gif') as File;
  const pathField = formData.get('path') as string;
  const img1 = formData.get('img1') as File;
  const img2 = formData.get('img2') as File;
  const img3 = formData.get('img3') as File;

  const saveFile = async (file: File) => {
    const uploadDirectory = path.resolve('public/uploads');

    if (!existsSync(uploadDirectory)) {
      mkdirSync(uploadDirectory, { recursive: true });
    }

    const filename = `${Date.now()}-${file.name}`;
    const filepath = path.join(uploadDirectory, filename);
    await fs.writeFile(filepath, Buffer.from(await file.arrayBuffer()));
    return filename;
  };

  const coverFilename = await saveFile(cover);
  const gifFilename = await saveFile(gif);
  const img1Filename = await saveFile(img1);
  const img2Filename = await saveFile(img2);
  const img3Filename = await saveFile(img3);

  await prisma.wip.create({
    data: {
      name,
      category,
      description,
      cover: coverFilename,
      gif: gifFilename,
      img1: img1Filename,
      img2: img2Filename,
      img3: img3Filename,
      path: pathField,
    },
  });

  return redirect('/wip');
};

export function links() {
  return [{ rel: 'stylesheet', href: '/assets/styles/addprojects.css' }];
}

export default function AddWip() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
  };

  return (
    <div className="add-projects-container">
      <Form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Name:
            <input type="text" name="name" required />
          </label>
        </div>
        <div className="form-group">
          <label>
            Category:
            <input type="text" name="category" required />
          </label>
        </div>
        <div className="form-group">
          <label>
            Description:
            <textarea name="description" required></textarea>
          </label>
        </div>
        <div className="form-group">
          <label>
            Upload Cover Image (Required):
            <input type="file" name="cover" accept="image/*" required />
          </label>
        </div>
        <div className="form-group">
          <label>
            Upload GIF:
            <input type="file" name="gif" accept="image/gif" required />
          </label>
        </div>
        <div className="form-group">
          <label>
            Upload Image 1:
            <input type="file" name="img1" accept="image/*" required />
          </label>
        </div>
        <div className="form-group">
          <label>
            Upload Image 2:
            <input type="file" name="img2" accept="image/*" required />
          </label>
        </div>
        <div className="form-group">
          <label>
            Upload Image 3:
            <input type="file" name="img3" accept="image/*" required />
          </label>
        </div>
        <div className="form-group">
          <label>
            Path:
            <input type="text" name="path" required />
          </label>
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add WIP'}
        </button>
      </Form>
    </div>
  );
}
