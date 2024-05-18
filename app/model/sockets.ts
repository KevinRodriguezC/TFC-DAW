import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function AddUserSocket(workspaceId: number, socketId: string) {
  return await prisma.userSocketsOnWorkspaces.create({
    data: { workspaceId: workspaceId, socketId: socketId },
  });
}
