import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";

import stylesheet from "~/tailwind.css";
import ErrorPage from "./components/errorPage";
import i18n from "./i18n";
import { UserProvider } from "./context/user";
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

// If an error happends
export function ErrorBoundary() {
  const error = useRouteError();
  console.log(error);
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ErrorPage error={error} />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

i18n.changeLanguage("es");
// Main react function
export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <UserProvider>
          <Outlet />
        </UserProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
