import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getCodeFromWorkspace(workspaceId: number, code: string) {
  return await prisma.invitationCodes.findFirst({
    where: {
      code: code,
      workspaceId: workspaceId,
    },
  });
}

export async function getInvitationCodesByWorkspace(workspaceId: number) {
  return await prisma.invitationCodes.findMany({
    where: {
      workspaceId: workspaceId,
    },
  });
}

export async function createInvitationCode(code: string, workspaceId: number) {
  return await prisma.invitationCodes.create({
    data: {
      code: code,
      workspaceId: workspaceId,
    },
  });
}

export async function deleteInvitation(invitationId: number) {
  return await prisma.invitationCodes.delete({
    where: {
      id: invitationId,
    },
  });
}
