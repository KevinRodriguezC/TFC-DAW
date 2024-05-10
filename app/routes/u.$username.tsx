import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { getWorkspacesByUser } from "~/model/workspace";
import { getUserByUsername } from "~/model/user";
import { useTranslation } from "react-i18next";
import { getUserSession } from "~/getUserSession";
import { getSession } from "~/sessions";
import { UserProfilePicture } from "~/components/userProfilePicture";

export const meta: MetaFunction = () => {
  const { t } = useTranslation();

  return [
    { title: t("user_info") + " | TFC App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { userId } = await getUserSession(
    await getSession(request.headers.get("Cookie"))
  );
  const username = params.username;
  const user = await getUserByUsername(username);
  if (!user) {
    throw new Error("User not found");
  }
  if (user.visibility == 0 && user.id != userId) {
    throw new Response("This user is a private user", { status: 403 });
  }
  const userWorkspaces = await getWorkspacesByUser(user.id);
  let workspaces = [];
  for (let i = 0; i < userWorkspaces.length; i++) {
    workspaces.push(userWorkspaces[i].workspace);
  }
  return json({ user, workspaces });
};

export default function Index() {
  let { user, workspaces } = useLoaderData<typeof loader>();
  const { t } = useTranslation();

  return (
    <>
      <div className="flex gap-2">
        <UserProfilePicture user={user} size={"size-16 text-2xl"} />
        <div className="flex flex-col justify-center">
          <h2 className="text-xl font-bold">
            {user.name} {user.lastname}
          </h2>
          <h4 className="text-lg">@{user.username}</h4>
        </div>
      </div>
      {workspaces ? (
        <>
          <h2 className="text-2xl">{t("workspaces")}</h2>
          {workspaces.map((workspace: any) => (
            <Link
              key={workspace.id}
              to={"/w/" + workspace.id}
              className="bg-slate-100 dark:bg-slate-800 py-2 px-4 flex flex-col gap-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-900 active:bg-slate-300 dark:active:bg-slate-950"
            >
              <h2 className="text-xl font-bold">{workspace.name}</h2>
              <h3>{workspace.description}</h3>
            </Link>
          ))}
        </>
      ) : (
        <p>No workspaces</p>
      )}
    </>
  );
}
