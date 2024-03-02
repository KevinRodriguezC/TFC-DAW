import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import {
  Link,
  Outlet,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import { json } from "@remix-run/node";

import { getSession, commitSession } from "../sessions";

export const meta: MetaFunction = () => {
  return [
    { title: "App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  let userId = session.get("userId");

  return json({ userId });
}

export function ErrorBoundary() {
  const error = useRouteError();
  console.log(error);
  return (
    <div className="min-h-screen p-4 flex flex-col gap-4 items-center justify-center bg-red-100 text-red-950">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="128"
        height="128"
        fill="currentColor"
        className="bi bi-exclamation-triangle-fill"
        viewBox="0 0 16 16"
      >
        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
      </svg>
      <h1 className=" text-5xl font-bold">
        {isRouteErrorResponse(error) ? error.status : "Unknown error"}
      </h1>
      <p>Something went wrong</p>
      <Link to="/app">Go back</Link>
    </div>
  );
}

export default function Index() {
  return <Outlet />;
}
