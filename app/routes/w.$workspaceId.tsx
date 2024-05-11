import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, Link, useLoaderData } from "@remix-run/react";

import {
  getUserInWorkspace,
  getWorkspaceById,
  getWorkspaceUsers,
} from "~/model/workspace";
import { getDirectoriesByWorkspace } from "~/model/directory";
import { UserDropdown } from "~/components/userDropdown";
import { getUserSession } from "~/getUserSession";
import { getSession } from "~/sessions";
import { useTranslation } from "react-i18next";
import { TopContainer } from "~/components/topContainer";
import { CenterContainer } from "~/components/centerContainer";
import { WorkspaceSidebar } from "~/components/workspaceSidebar";
import { WorkspaceInfobar } from "~/components/workspaceInfobar";
import { useState } from "react";
import { HistoryInfobar } from "~/components/historyInfobar";
import { getEventsByWorkspaceId } from "~/model/events";
import { UserProfilePicture } from "~/components/userProfilePicture";
import { manageLogin } from "~/manageLogin";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  // Get the user session info
  const { userId, userInfo } = await getUserSession(
    await getSession(request.headers.get("Cookie"))
  );

  // Check if the parameter "workspaceId" exist
  const workspaceId = params.workspaceId;
  if (!workspaceId || !+workspaceId) {
    throw new Response("Workspace not found", { status: 404 });
  }

  // Check if the workspace exist
  const workspaceIdNumber = +workspaceId;
  const workspaceUsers = await getWorkspaceUsers(workspaceIdNumber);
  const workspace = await getWorkspaceById(workspaceIdNumber);
  if (!workspace || !workspaceUsers) {
    throw new Response("Workspace not found", { status: 404 });
  }

  // Check if the user has privileges to view the workspace

  // If the user isn't loged in and the workspace is private, it sends a 404 message
  if (!userId && workspace.visibility == 0) {
    throw new Response("Workspace not found", { status: 404 });
  }

  // If the user isn't a member of the workspace and the workspace is a private workspace, it sends a 404 message
  if (workspace.visibility == 0) {
    const userOnWorkspace = await getUserInWorkspace(+workspaceId, +userId);
    if (!userOnWorkspace) {
      throw new Response("Workspace not found", { status: 404 });
    }
  }

  // Load the workspace
  const workspaceEvents = await getEventsByWorkspaceId(workspaceIdNumber);
  let users = [];
  for (let i = 0; i < workspaceUsers.length; i++) {
    users.push({
      username: workspaceUsers[i].user.username,
      name: workspaceUsers[i].user.name,
      lastname: workspaceUsers[i].user.lastname,
      profilePictureColor: workspaceUsers[i].user.profilePictureColor,
    });
  }
  const directories = await getDirectoriesByWorkspace(+workspaceId);

  // Send the data of the workspace to the client
  return json({
    userInfo,
    workspace,
    directories,
    users,
    workspaceEvents,
    canEdit: userId != undefined,
  });
};

export default function Workspace() {
  const { userInfo, workspace, directories, users, workspaceEvents, canEdit } =
    useLoaderData<typeof loader>();
  const { t } = useTranslation();
  const [rightBarMenu, setRightBarMenu] = useState(0);
  const setRightBarMenuToggle = (newState: number) => {
    if (rightBarMenu == newState) {
      setRightBarMenuToggle(0);
    } else {
      setRightBarMenu(newState);
    }
  };

  manageLogin(userInfo);

  return (
    <div className="container-primary-bg dark:text-white h-screen flex flex-col">
      <TopContainer>
        <div className="border-r-2 border-b-2 container-secondary-border p-2 w-80 flex justify-between items-center gap-2">
          <h2 className="font-bold text-xl">{workspace.name}</h2>
          {canEdit ? (
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
          ) : (
            ""
          )}
        </div>
        <div className="container-secondary-bg border-b-2 container-secondary-border flex-1 p-2 flex gap-2 justify-between">
          <div className="flex gap-2 "></div>
          <div className="flex gap-2">
            <button className="bg-blue-600 btn-user-icon">B</button>
            <button className="bg-red-600 btn-user-icon">C</button>
            <span className="w-[2px] bg-slate-300 dark:bg-slate-900"></span>
            <button
              className="btn-icon"
              onClick={() => setRightBarMenuToggle(1)}
            >
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
            <button
              className="btn-icon"
              onClick={() => setRightBarMenuToggle(2)}
            >
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
              <UserDropdown />
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
      </TopContainer>
      <CenterContainer>
        <WorkspaceSidebar directories={directories} canEdit={canEdit} />
        <Outlet />
        {rightBarMenu == 0 ? (
          <></>
        ) : rightBarMenu == 1 ? (
          <WorkspaceInfobar userInfo={userInfo} users={users} />
        ) : (
          <HistoryInfobar events={workspaceEvents} />
        )}
      </CenterContainer>
    </div>
  );
}
