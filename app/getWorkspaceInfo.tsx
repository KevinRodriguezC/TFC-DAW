import { getUserSession } from "./getUserSession";
import { getDirectoriesByWorkspace } from "./model/directory";
import { getEventsByWorkspaceId } from "./model/events";
import {
  getUserInWorkspace,
  getWorkspaceById,
  getWorkspaceUsers,
} from "./model/workspace";
import { getSession } from "./sessions";

export const getWorkspaceInfo = async (request: any, params: any) => {
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
  return {
    userInfo,
    workspace,
    directories,
    users,
    workspaceEvents,
    canEdit: userId != undefined,
  };
};
