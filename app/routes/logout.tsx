import { LoaderFunction, redirect } from "@remix-run/node";
import { destroySession, getSession } from "../session";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  return redirect("/saves", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};
