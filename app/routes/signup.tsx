import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

import Header from "../components/header";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const meta: MetaFunction = () => {
  return [
    { title: "App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  const user = await prisma.user.create({
    data: {
      email: "example@mail.com",
      username: "1",
      name: "1",
      lastname: "1",
      visibility: 0,
      password: "password",
    },
  });

  return json({});
}

export default function Index() {
  return (
    <div className="flex flex-col dark:text-white min-h-screen">
      <Header username={null} />
      <div className="flex flex-1 flex-col dark:text-white container-secondary-bg justify-center items-center">
        <form
          method="post"
          className="container-primary-bg container-secondary-border border-2 rounded-md p-4 flex flex-col gap-4"
        >
          <h1 className="text-2xl">Sign up</h1>
          <label htmlFor="email">Email</label>
          <input type="text" className="form-control" name="email" />
          <label htmlFor="email">username</label>
          <input type="text" className="form-control" name="username" />
          <label htmlFor="email">Name</label>
          <input type="text" className="form-control" name="name" />
          <label htmlFor="email">Lastname</label>
          <input type="text" className="form-control" name="lastname" />
          <label htmlFor="email">Password</label>
          <input type="password" className="form-control" name="password" />
          <input type="submit" value="Login" />
        </form>
      </div>
    </div>
  );
}
