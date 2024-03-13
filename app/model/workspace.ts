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
