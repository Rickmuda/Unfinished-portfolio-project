import { json, redirect, ActionFunction } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';
import { prisma } from '../../prisma/prismaClient';
import { commitSession, getSession } from '../session';

import "../../public/assets/style/login.css"; // Import the CSS file

type ActionData = {
  error?: string;
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();

  if (!email || !password) {
    return json<ActionData>({ error: 'Email and password are required' }, { status: 400 });
  }

  const user = await prisma.users.findUnique({
    where: { email },
  });

  if (!user || user.password !== password) {
    return json<ActionData>({ error: 'Invalid email or password' }, { status: 401 });
  }

  const session = await getSession(request.headers.get('Cookie'));
  session.set('user', { email: user.email, isAdmin: user.is_admin });
  console.log('Setting user session:', { email: user.email, isAdmin: user.is_admin }); // Debug log
  return redirect('/saves', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
};

export default function Login() {
  const actionData = useActionData<ActionData>();

  return (
    <div className="login-container">
      <Form method="post" className="login-form">
        {actionData?.error && <p className="error-message">{actionData.error}</p>}
        <label>
          Email:
          <input type="email" name="email" required />
        </label>
        <label>
          Password:
          <input type="password" name="password" required />
        </label>
        <button type="submit">Login</button>
      </Form>
    </div>
  );
}
