import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import {
  Link,
  Outlet,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import { json } from "@remix-run/node";

import { getSession, commitSession } from "../sessions";
import ErrorPage from "~/components/errorPage";

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
  return <ErrorPage error={error} />;
}

export default function Index() {
  return <Outlet />;
}
