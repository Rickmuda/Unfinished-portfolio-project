import React, { useState } from 'react';
import type { ActionFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { Form } from '@remix-run/react';
import { prisma } from '../../prisma/prismaClient';

export const action: ActionFunction = async ({ request }) => {
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
    const path = require('path');
    const fs = require('fs');
    const uploadDirectory = path.resolve('public/uploads');

    if (!fs.existsSync(uploadDirectory)) {
      fs.mkdirSync(uploadDirectory, { recursive: true });
    }

    const filename = `${Date.now()}-${file.name}`;
    const filepath = path.join(uploadDirectory, filename);
    await fs.promises.writeFile(filepath, Buffer.from(await file.arrayBuffer()));
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
  return [{ rel: 'stylesheet', href: '/assets/style/addprojects.css' }];
}

export default function AddWip() {
  const [imgPreviews, setImgPreviews] = useState<(string | ArrayBuffer | null)[]>([null, null, null, null]);
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
            <input type="file" name="cover" accept="image/*" onChange={handleImgChange(0)} required />
          </label>
          {imgPreviews[0] && (
            <div className="preview">
              <h3>Cover Image Preview:</h3>
              <img src={imgPreviews[0]?.toString()} alt="Cover Image Preview" />
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
            Upload Image 1:
            <input type="file" name="img1" accept="image/*" onChange={handleImgChange(1)} required />
          </label>
          {imgPreviews[1] && (
            <div className="preview">
              <h3>Image 1 Preview:</h3>
              <img src={imgPreviews[1]?.toString()} alt="Image 1 Preview" />
            </div>
          )}
        </div>
        <div className="form-group">
          <label>
            Upload Image 2:
            <input type="file" name="img2" accept="image/*" onChange={handleImgChange(2)} required />
          </label>
          {imgPreviews[2] && (
            <div className="preview">
              <h3>Image 2 Preview:</h3>
              <img src={imgPreviews[2]?.toString()} alt="Image 2 Preview" />
            </div>
          )}
        </div>
        <div className="form-group">
          <label>
            Upload Image 3:
            <input type="file" name="img3" accept="image/*" onChange={handleImgChange(3)} required />
          </label>
          {imgPreviews[3] && (
            <div className="preview">
              <h3>Image 3 Preview:</h3>
              <img src={imgPreviews[3]?.toString()} alt="Image 3 Preview" />
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
          {isSubmitting ? 'Adding...' : 'Add WIP'}
        </button>
      </Form>
    </div>
  );
}
