import type { MetaFunction, ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Link } from "@remix-run/react";

import { getSession, destroySession } from "../sessions";

export const meta: MetaFunction = () => {
  return [
    { title: "App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const action = async({
  request,
}: ActionFunctionArgs) => {
  const session = await getSession(
    request.headers.get("Cookie")
  )

  return redirect('/login', {
    headers: {
      "Set-Cookie": await destroySession(session),
    }
  });
}

export default function LogoutRoute() {
  return (
    <>
      <p>Are you sure you want to log out?</p>
      <form method="post">
        <button>Logout</button>
      </form>
      <Link to="/">Never mind</Link>
    </>
  );
}
