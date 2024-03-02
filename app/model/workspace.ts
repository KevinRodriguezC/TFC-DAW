import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getWorkspacesByUser(user: any) {
  return await prisma.workspace.findMany();
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
  name: string,
  description: string,
  visibility: number
) {
  return await prisma.workspace.create({
    data: {
      name: name,
      description: description,
      visibility: visibility,
    },
  });
}
