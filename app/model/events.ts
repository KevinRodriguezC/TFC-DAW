import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getEventsByWorkspaceId(workspaceId: number) {
  return await prisma.events.findMany({
    where: {
      userId: workspaceId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getEventsByUserId(userId: number) {
  return await prisma.events.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function addEvent(
  type: number,
  row: number,
  userId: number,
  workspaceId: number | null,
  name: string | null,
  value: string | null
) {
  return await prisma.events.create({
    data: {
      type: type,
      row: row,
      userId: userId,
      workspaceId: workspaceId,
      name: name,
      value: value,
    },
  });
}
