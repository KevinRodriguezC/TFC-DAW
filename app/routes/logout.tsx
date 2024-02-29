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

export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));

  return redirect("/login", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};

export default function LogoutRoute() {
  return (
    <>
      <div className="flex flex-col dark:text-white min-h-screen">
        <div className="flex flex-1 flex-col dark:text-white container-secondary-bg justify-center items-center">
          <form
            method="post"
            className="container-primary-bg container-secondary-border border-2 rounded-md p-4 flex flex-col gap-4 min-w-96"
          >
            <h2 className="">
              Are you sure you want to log out?
            </h2>
            <div className="flex gap-2 justify-end">
              <Link to="/" className="btn-secondary">
                Never mind
              </Link>
              <button className="btn-primary">Logout</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
