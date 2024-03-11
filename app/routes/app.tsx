import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { getSession } from "../sessions";

import { getWorkspacesByUser } from "~/model/workspace";

import Header from "../components/header";
import { getUserSession } from "~/getUserSession";
import { MainContainer } from "~/components/mainContainer";

export const meta: MetaFunction = () => {
  return [
    { title: "App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const { userId, userInfo } = await getUserSession(
    await getSession(request.headers.get("Cookie"))
  );
  const userWorkspaces = await getWorkspacesByUser(+userId);
  let workspaces = [];
  for (let i = 0; i < userWorkspaces.length; i++) {
    workspaces.push(userWorkspaces[i].workspace);
  }
  return json({ userInfo, workspaces });
}

export default function Index() {
  const { userInfo, workspaces } = useLoaderData<typeof loader>();

  return (
    <MainContainer>
      <Header username={userInfo.username} name={userInfo.name} />
      <div className="xl:mx-auto xl:w-[1020px] flex flex-col gap-4 m-4 flex-1">
        <p>Select a workspace</p>
        {workspaces.length ? (
          workspaces.map((workspace: any) => (
            <Link
              to={"/w/" + workspace.id}
              className="bg-slate-100 dark:bg-slate-800 py-2 px-4 flex flex-col gap-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-900 active:bg-slate-300 dark:active:bg-slate-950"
            >
              <h2 className="text-xl font-bold">{workspace.name}</h2>
              <h3>{workspace.description}</h3>
            </Link>
          ))
        ) : (
          <p>No results</p>
        )}
        <Link to="/w/new">New workspace</Link>
      </div>
    </MainContainer>
  );
}
