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

export async function createDirectory(
  workspaceId: number,
  directoryName: string
) {
  return await prisma.directory.create({
    data: {
      name: directoryName,
      description: "",
      parentId: workspaceId,
    },
  });
}

export async function updateDirectory(
  directoryId: number,
  name: string,
  description: string = ""
) {
  return await prisma.directory.update({
    where: {
      id: directoryId,
    },
    data: {
      name: name,
      description: description,
    },
  });
}

export async function deleteDirectory(directoryId: number) {
  return await prisma.directory.delete({
    where: {
      id: directoryId,
    },
  });
}
