import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getDirectoriesByWorkspace(workspaceId: number) {
  return await prisma.directory.findMany({
    where: {
      parentId: {
        equals: workspaceId,
      },
    },
  });
}

export async function getDirectoryInfo(id: number) {
  return await prisma.directory.findFirst({
    where: {
      id: {
        equals: id,
      },
    },
  });
}
