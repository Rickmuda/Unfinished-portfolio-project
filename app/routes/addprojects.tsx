// app/routes/addprojects.tsx

import type { ActionFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { Form } from '@remix-run/react';
import { prisma } from '../../prisma/prismaClient';

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get('name') as string;
  const category = formData.get('category') as string;
  const description = formData.get('description') as string;
  const img = formData.get('img') as string;
  const gif = formData.get('gif') as string;
  const path = formData.get('path') as string;

  await prisma.projects.create({
    data: { name, category, description, img, gif, path },
  });

  return redirect('/projects');
};

export default function AddProjects() {
  return (
    <div>
      <h1>Add Project</h1>
      <Form method="post">
        <div>
          <label>
            Name: <input type="text" name="name" />
          </label>
        </div>
        <div>
          <label>
            Category: <input type="text" name="category" />
          </label>
        </div>
        <div>
          <label>
            Description: <textarea name="description"></textarea>
          </label>
        </div>
        <div>
          <label>
            Image URL: <input type="text" name="img" />
          </label>
        </div>
        <div>
          <label>
            GIF URL: <input type="text" name="gif" />
          </label>
        </div>
        <div>
          <label>
            Path: <input type="text" name="path" />
          </label>
        </div>
        <button type="submit">Add Project</button>
      </Form>
    </div>
  );
}
