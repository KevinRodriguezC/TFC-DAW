import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getWorkspacesByUser(userId: number) {
  return await prisma.userOnWorkspaces.findMany({
    where: {
      userId: {
        equals: userId,
      },
    },
    include: {
      workspace: true,
    },
  });
}

export async function getWorkspaceById(id: number) {
  const result = await prisma.workspace.findFirst({
    where: {
      id: {
        equals: id,
      },
    },
  });
  return result;
}

export async function createWorkspace(
  admin: number,
  name: string,
  description: string,
  visibility: number
) {
  const workspace = await prisma.workspace.create({
    data: {
      name: name,
      description: description,
      visibility: visibility,
    },
  });
  await prisma.userOnWorkspaces.create({
    data: {
      userId: admin,
      workspaceId: workspace.id,
      role: 0,
    },
  });
  return workspace;
}

export async function updateWorkspace(
  workspaceId: number,
  workspaceName: string,
  workspaceDescription = "",
  workspaceVisibility: number
) {
  return await prisma.workspace.update({
    where: {
      id: workspaceId,
    },
    data: {
      name: workspaceName,
      description: workspaceDescription,
      visibility: workspaceVisibility,
    },
  });
}

export async function getWorkspaceUsers(workspaceId: number) {
  return await prisma.userOnWorkspaces.findMany({
    where: {
      workspaceId: {
        equals: workspaceId,
      },
    },
    include: {
      user: true,
    },
  });
}

export async function addUserToWorkspace(
  workspaceId: number,
  userId: number,
  role: number
) {
  return await prisma.userOnWorkspaces.create({
    data: {
      workspaceId: workspaceId,
      userId: userId,
      role: role,
    },
  });
}

export async function getUserInWorkspace(workspaceId: number, userId: number) {
  return await prisma.userOnWorkspaces.findFirst({
    where: {
      workspaceId: workspaceId,
      userId: userId,
    },
  });
}

export async function removeUser(connectionId: number) {
  return await prisma.userOnWorkspaces.delete({
    where: {
      id: connectionId,
    },
  });
}

export async function getUserOnWorkspaceConnection(
  userId: number,
  workspaceId: number
) {
  return await prisma.userOnWorkspaces.findFirst({
    where: {
      workspaceId: workspaceId,
      userId: userId,
    },
  });
}
