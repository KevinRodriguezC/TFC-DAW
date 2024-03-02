import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getUserByUsername(username: any) {
  return await prisma.user.findFirst({
    where: {
      username: {
        equals: username,
      },
    },
  });
}

export async function getUserInfo(id: any) {
  return await prisma.user.findFirst({
    where: {
      id: id,
    },
  });
}

export async function createUser(
  email: string,
  username: string,
  name: string,
  lastname: string,
  password: string
) {
  return await prisma.user.create({
    data: {
      email: email,
      username: username,
      name: name,
      lastname: lastname,
      visibility: 0,
      password: password,
    },
  });
}

export async function updateUser(
  id: number,
  name: string,
  lastname: string,
  visibility: number
) {
  return await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      name: name,
      lastname: lastname,
      visibility: visibility,
    },
  });
}
