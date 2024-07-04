/* eslint-disable jsx-a11y/img-redundant-alt */
// app/routes/addwip.tsx

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
  const gif = formData.get('gif') as File;
  const pathField = formData.get('path') as string;

  const imgFiles: File[] = [];
  for (let i = 0; i < 5; i++) {
    const imgFile = formData.get(`img${i}`) as File;
    imgFiles.push(imgFile);
  }

  const imgFilenames = imgFiles.map(img => `${Date.now()}-${img.name}`);
  const imgPaths = imgFilenames.map(filename => path.join(uploadDirectory, filename));

  await Promise.all(imgFiles.map(async (img, index) => fs.promises.writeFile(imgPaths[index], Buffer.from(await img.arrayBuffer()))));

  const gifFilename = `${Date.now()}-${gif.name}`;
  const gifPath = path.join(uploadDirectory, gifFilename);

  fs.writeFileSync(gifPath, Buffer.from(await gif.arrayBuffer()));

  await prisma.wip.create({
    data: {
      name,
      category,
      description,
      cover: imgFilenames[0], // Use the first image as cover
      img: imgFilenames.slice(1).map(filename => `${filename}`).join(','), // Use the rest of the images
      gif: `${gifFilename}`,
      path: pathField,
    },
  });

  return redirect('/wip');
};

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export default function AddWip() {
  const [imgPreviews, setImgPreviews] = useState<(string | ArrayBuffer | null)[]>([null, null, null, null, null]);
  const [gifPreview, setGifPreview] = useState<string | ArrayBuffer | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImgChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImgPreviews = [...imgPreviews];
        newImgPreviews[index] = reader.result;
        setImgPreviews(newImgPreviews);
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
        {[...Array(5)].map((_, index) => (
          <div className="form-group" key={index}>
            <label>
              {index === 0 ? 'Upload Cover Image' : `Upload Image ${index + 1}`}:
              <input type="file" name={`img${index}`} accept="image/*" onChange={handleImgChange(index)} required />
            </label>
            {imgPreviews[index] && (
              <div className="preview">
                <h3>{index === 0 ? 'Cover Image Preview' : `Image ${index + 1} Preview`}:</h3>
                <img src={imgPreviews[index]?.toString()} alt={index === 0 ? 'Cover Image Preview' : `Image ${index + 1} Preview`} />
              </div>
            )}
          </div>
        ))}
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
          {isSubmitting ? 'Adding...' : 'Add W.I.P.'}
        </button>
      </Form>
    </div>
  );
}
