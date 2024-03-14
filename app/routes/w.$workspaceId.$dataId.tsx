import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";

import { Outlet, isRouteErrorResponse, useRouteError } from "@remix-run/react";
import ErrorComponent from "~/components/errorComponent";

export function ErrorBoundary() {
  let error = useRouteError();
  console.log(error);
  return ErrorComponent(error);
}

export default function Index() {
  return <Outlet />;
}
