import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

async function getUserByName(username: any) {
  const result = await prisma.user.findFirst({
    where: {
      username: {
        contains: username,
      },
    },
  });
  return result;
}

async function getWorkspacesByUser(username: any) {
  const result = await prisma.workspace.findMany({
    // where: {
    //   admin: {
    //     contains: username,
    //   },
    // },
  });
  return result;
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  // const url = new URL(request.url);
  // invariant(params.usernane, "User not found")
  const username = params.username;
  const user = await getUserByName(username);
  if (!user) {
    throw new Error("User not found");
  }
  const workspaces = await getWorkspacesByUser(user.username);
  return json({ user, workspaces });
};

export default function Index() {
  let { user, workspaces } = useLoaderData<typeof loader>();


  
  return (
    <>
      <h2>
        {user.name} {user.lastname}
      </h2>
      <h4>@{user.username}</h4>
      {workspaces ? (
        workspaces.map((workspace: any) => (
          <a
            href={"/w/" + workspace.id}
            className="bg-slate-100 dark:bg-slate-800 py-2 px-4 flex flex-col gap-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-900 active:bg-slate-300 dark:active:bg-slate-950"
          >
            <h2 className="text-xl font-bold">{workspace.name}</h2>
            <h3>{workspace.description}</h3>
          </a>
        ))
      ) : (
        <p>No workspaces</p>
      )}
    </>
  );
}
