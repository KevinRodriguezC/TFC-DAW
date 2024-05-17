import { Outlet, useRouteError } from "@remix-run/react";

import ErrorPage from "~/components/errorPage";
import { WorkspaceContext, WorkspaceProvider } from "~/context/workspace";

export function ErrorBoundary() {
  const error = useRouteError();
  return <ErrorPage error={error} />;
}

export default function Workspace() {
  return (
    <WorkspaceProvider>
      <Outlet />
    </WorkspaceProvider>
  );
}
