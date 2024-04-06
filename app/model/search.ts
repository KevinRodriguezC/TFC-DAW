import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function searchUsers(q: any) {
  return await prisma.user.findMany({
    where: {
      OR: [
        {
          username: {
            contains: q,
          },
        },
        {
          name: {
            contains: q,
          },
        },
        {
          lastname: {
            contains: q,
          },
        },
      ],
      visibility: 1,
    },
  });
}
