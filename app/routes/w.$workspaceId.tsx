import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, Link, NavLink, useLoaderData } from "@remix-run/react";

import { getWorkspaceById } from "~/model/workspace";
import { getDirectoriesByWorkspace } from "~/model/directory";
import { UserDropdown } from "~/components/userDropdown";

export const meta: MetaFunction = () => {
  return [
    { title: "App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const workspaceId = params.workspaceId;
  if (!workspaceId) {
    throw new Response("Workspace not found", { status: 404 });
  }
  const workspaceIdNumber = +workspaceId;
  if (!workspaceIdNumber) {
    throw new Response("Workspace not found", { status: 404 });
  }
  const workspace = await getWorkspaceById(workspaceIdNumber);
  if (!workspace) {
    throw new Response("Workspace not found", { status: 404 });
  }
  const directories = await getDirectoriesByWorkspace(+workspaceId);
  return json({ workspace, directories });
};

export default function Index() {
  const { workspace, directories } = useLoaderData<typeof loader>();

  return (
    <div
      className="h-screen flex flex-col dark:text-white"
      style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}
    >
      <div className="flex overflow-hidden">
        <div className="container-secondary-bg border-r-2 border-b-2 container-secondary-border p-2 w-80 flex justify-between items-center gap-2">
          <h2 className="font-bold text-xl">{workspace.name}</h2>
          <button className="btn-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-gear-fill"
              viewBox="0 0 16 16"
            >
              <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
            </svg>
          </button>
        </div>
        <div className="container-secondary-bg border-b-2 container-secondary-border flex-1 p-2 flex gap-2 justify-between">
          <div className="flex gap-2 ">
            <Link
              className="rounded-full bg-slate-300 dark:bg-slate-900 hover:bg-slate-400 dark:hover:bg-slate-950 flex items-center justify-center px-10 text-xl"
              to="/"
            >
              Home
            </Link>
            <Link
              className="rounded-full bg-slate-300 dark:bg-slate-900 hover:bg-slate-400 dark:hover:bg-slate-950 flex items-center justify-center px-10 text-xl"
              to="/"
            >
              Home
            </Link>
            <Link
              className="rounded-full bg-slate-300 dark:bg-slate-900 hover:bg-slate-400 dark:hover:bg-slate-950 flex items-center justify-center px-10 text-xl"
              to="/"
            >
              Home
            </Link>
          </div>
          <div className="flex gap-2">
            <button className="bg-blue-600 btn-user-icon">B</button>
            <button className="bg-red-600 btn-user-icon">C</button>
            <span className="w-[2px] bg-slate-300 dark:bg-slate-900"></span>
            <button className="btn-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-people-fill"
                viewBox="0 0 16 16"
              >
                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
              </svg>
            </button>
            <button className="btn-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-clock-history"
                viewBox="0 0 16 16"
              >
                <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z" />
                <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z" />
                <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5" />
              </svg>
            </button>
            {/* <button className="bg-purple-600 flex items-center justify-center rounded-full text-white w-10 h-10 font-bold text-lg"> */}
            <UserDropdown username="A"></UserDropdown>
          </div>
        </div>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="container-secondary-bg border-r-2 container-secondary-border p-2 w-80 flex flex-col gap-2 overflow-y-auto">
          <div className="flex gap-2 align-middle">
            <div className="w-14 h-14 bg-green-600 rounded-full flex  justify-center items-center text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                className="bi bi-window-sidebar"
                viewBox="0 0 16 16"
              >
                <path d="M2.5 4a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m2-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m1 .5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1" />
                <path d="M2 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v2H1V3a1 1 0 0 1 1-1zM1 13V6h4v8H2a1 1 0 0 1-1-1m5 1V6h9v7a1 1 0 0 1-1 1z" />
              </svg>
            </div>
            <h3 className="text-2xl self-center font-bold">Workspaces</h3>
          </div>
          <ul className="flex flex-col gap-2">
            {directories.length ? (
              directories.map((directory: any) => (
                <li>
                  <NavLink className="navbarItem" to={"" + directory.id}>
                    <div className="p-2 flex gap-2 text-xl font-bold items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        fill="currentColor"
                        className="bi bi-calendar-week"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z" />
                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                      </svg>
                      <div>{directory.name}</div>
                    </div>
                  </NavLink>
                </li>
              ))
            ) : (
              <p>No directories</p>
            )}
          </ul>
          <Link to="new" className="btn-primary">
            New
          </Link>
        </div>
        <Outlet />
        <div className="container-secondary-bg border-l-2 container-secondary-border p-2 w-96 flex flex-col gap-2"></div>
      </div>
    </div>
  );
}
