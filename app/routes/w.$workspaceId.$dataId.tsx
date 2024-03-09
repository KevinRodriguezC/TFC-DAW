import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";

import { Outlet, isRouteErrorResponse, useRouteError } from "@remix-run/react";
import ErrorComponent from "~/components/errorComponent";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export function ErrorBoundary() {
  let error = useRouteError();
  console.log(error);
  return ErrorComponent(error);
}

export default function Index() {
  return <Outlet />;
}
