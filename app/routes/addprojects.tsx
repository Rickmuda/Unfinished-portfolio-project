/* eslint-disable jsx-a11y/img-redundant-alt */
// app/routes/addprojects.tsx

import React, { useState } from 'react';
import type { ActionFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { Form } from '@remix-run/react';
import { prisma } from '../../prisma/prismaClient';
import fs from 'fs';
import path from 'path';
import styles from '../../public/assets/style/addprojects.css';

const uploadDirectory = path.resolve('public/uploads');

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get('name') as string;
  const category = formData.get('category') as string;
  const description = formData.get('description') as string;
  const img = formData.get('img') as File;
  const gif = formData.get('gif') as File;
  const pathField = formData.get('path') as string;

  const imgFilename = `${Date.now()}-${img.name}`;
  const gifFilename = `${Date.now()}-${gif.name}`;

  const imgPath = path.join(uploadDirectory, imgFilename);
  const gifPath = path.join(uploadDirectory, gifFilename);

  fs.writeFileSync(imgPath, Buffer.from(await img.arrayBuffer()));
  fs.writeFileSync(gifPath, Buffer.from(await gif.arrayBuffer()));

  await prisma.projects.create({
    data: { name, category, description, img: `/uploads/${imgFilename}`, gif: `/uploads/${gifFilename}`, path: pathField },
  });

  return redirect('/projects');
};

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export default function AddProjects() {
  const [imgPreview, setImgPreview] = useState<string | ArrayBuffer | null>(null);
  const [gifPreview, setGifPreview] = useState<string | ArrayBuffer | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGifChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setGifPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // simulate server processing delay
    setIsSubmitting(false);
  };

  return (
    <div className="add-projects-container">
      <h1>Add Project</h1>
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
            Upload Image:
            <input type="file" name="img" accept="image/*" onChange={handleImgChange} required />
          </label>
          {imgPreview && (
            <div className="preview">
              <h3>Image Preview:</h3>
              <img src={imgPreview.toString()} alt="Image Preview" />
            </div>
          )}
        </div>
        <div className="form-group">
          <label>
            Upload GIF:
            <input type="file" name="gif" accept="image/gif" onChange={handleGifChange} required />
          </label>
          {gifPreview && (
            <div className="preview">
              <h3>GIF Preview:</h3>
              <img src={gifPreview.toString()} alt="GIF Preview" />
            </div>
          )}
        </div>
        <div className="form-group">
          <label>
            Path:
            <input type="text" name="path" required />
          </label>
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add Project'}
        </button>
      </Form>
    </div>
  );
}
