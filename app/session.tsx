import { createCookieSessionStorage } from "@remix-run/node";

// Create a session storage
const sessionSecret = process.env.SESSION_SECRET || "default_secret";
const { getSession, commitSession, destroySession } = createCookieSessionStorage({
  cookie: {
    name: "my_session",
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    httpOnly: true,
  },
});

export { getSession, commitSession, destroySession };
