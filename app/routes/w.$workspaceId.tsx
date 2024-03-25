import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, Link, NavLink, useLoaderData } from "@remix-run/react";

import { getWorkspaceById, getWorkspaceUsers } from "~/model/workspace";
import { getDirectoriesByWorkspace } from "~/model/directory";
import { UserDropdown } from "~/components/userDropdown";
import { getUserInfo } from "~/model/user";
import { getUserSession } from "~/getUserSession";
import { getSession } from "~/sessions";
import { useTranslation } from "react-i18next";
import { UserCardInfo } from "~/components/userCardInfo";

// export const meta: MetaFunction = () => {
//   const { t } = useTranslation();

//   return [
//     { title: t("workspace") + " | TFC App" },
//     { name: "description", content: "Workspace" },
//   ];
// };

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { userInfo } = await getUserSession(
    await getSession(request.headers.get("Cookie"))
  );
  const workspaceId = params.workspaceId;
  if (!workspaceId) {
    throw new Response("Workspace not found", { status: 404 });
  }
  const workspaceIdNumber = +workspaceId;
  if (!workspaceIdNumber) {
    throw new Response("Workspace not found", { status: 404 });
  }
  const workspace = await getWorkspaceById(workspaceIdNumber);
  const workspaceUsers = await getWorkspaceUsers(workspaceIdNumber);
  if (!workspace || !workspaceUsers) {
    throw new Response("Workspace not found", { status: 404 });
  }
  let users = [];
  for (let i = 0; i < workspaceUsers.length; i++) {
    users.push({
      username: workspaceUsers[i].user.username,
      name: workspaceUsers[i].user.name,
      lastname: workspaceUsers[i].user.lastname,
    });
  }
  const directories = await getDirectoriesByWorkspace(+workspaceId);
  return json({ userInfo, workspace, directories, users });
};

export default function Index() {
  const { userInfo, workspace, directories, users } =
    useLoaderData<typeof loader>();

  const { t } = useTranslation();

  return (
    <div
      className="h-screen flex flex-col dark:text-white"
      style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}
    >
      <div className="flex overflow-hidden">
        <div className="container-secondary-bg border-r-2 border-b-2 container-secondary-border p-2 w-80 flex justify-between items-center gap-2">
          <h2 className="font-bold text-xl">{workspace.name}</h2>
          <Link to="settings" className="btn-icon">
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
          </Link>
        </div>
        <div className="container-secondary-bg border-b-2 container-secondary-border flex-1 p-2 flex gap-2 justify-between">
          <div className="flex gap-2 ">
            {/* <Link
              className="rounded-full bg-slate-300 dark:bg-slate-900 hover:bg-slate-400 dark:hover:bg-slate-950 flex items-center justify-center px-10 text-xl"
              to="/"
            >
              {t("home")}
            </Link> */}
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
            {userInfo && userInfo.username && userInfo.name ? (
              <UserDropdown username={userInfo.username} name={userInfo.name} />
            ) : (
              <>
                <Link to="/login" className="btn-secondary h-10">
                  {t("login")}
                </Link>
                <Link to="/signup" className="btn-primary h-10">
                  {t("create_an_account")}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="container-secondary-bg border-r-2 container-secondary-border p-2 w-80 flex flex-col gap-2 overflow-y-auto">
          <div className="flex gap-2 align-middle">
            <div className="rounded-md p-2 flex bg-slate-200 dark:bg-slate-900 justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-window-sidebar"
                viewBox="0 0 16 16"
              >
                <path d="M2.5 4a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m2-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m1 .5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1" />
                <path d="M2 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v2H1V3a1 1 0 0 1 1-1zM1 13V6h4v8H2a1 1 0 0 1-1-1m5 1V6h9v7a1 1 0 0 1-1 1z" />
              </svg>
            </div>
            <h3 className="text-md self-center font-bold">
              {t("directories")}
            </h3>
          </div>
          <ul className="flex flex-col gap-2 flex-1">
            {directories.length
              ? directories.map((directory: any) => (
                  <li>
                    <NavLink className="navbarItem" to={"" + directory.id}>
                      <div className="flex gap-2 p-2 bg-blue-600 text-white rounded-md">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-calendar-week"
                          viewBox="0 0 16 16"
                        >
                          <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z" />
                          <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                        </svg>
                      </div>
                      <div>{directory.name}</div>
                    </NavLink>
                  </li>
                ))
              : t("no_directories")}
          </ul>
          <Link to="new" className="btn-primary flex gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-plus-lg"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
              />
            </svg>
            {t("new_directory")}
          </Link>
        </div>
        <Outlet />
        <div className="container-secondary-bg border-l-2 container-secondary-border p-2 w-96 flex flex-col gap-2">
          <div className="flex gap-2 align-middle">
            <div className="rounded-md p-2 flex bg-slate-200 dark:bg-slate-900 justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-people-fill"
                viewBox="0 0 16 16"
              >
                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
              </svg>
            </div>
            <h3 className="text-md self-center font-bold">
              {t("participants")}
            </h3>
          </div>
          <div className="flex flex-col gap-2 flex-1">
            {users.length ? (
              users.map((workspaceUser: any) => (
                <NavLink
                  to={"u/" + workspaceUser.username}
                  className="participantLink"
                >
                  <div className="bg-blue-600 rounded-full size-8"></div>
                  {workspaceUser.username}
                  {workspaceUser.name}
                  {userInfo.username == workspaceUser.username ? (
                    <div className="bg-blue-600 text-white rounded-full px-3 self-center">
                      {t("you")}
                    </div>
                  ) : (
                    <></>
                  )}
                </NavLink>
              ))
            ) : (
              <></>
            )}
          </div>
          <Link to="i" className="btn-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-person-fill-gear"
              viewBox="0 0 16 16"
            >
              <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4m9.886-3.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0" />
            </svg>
            {t("manage_invitations")}
          </Link>
        </div>
      </div>
    </div>
  );
}
