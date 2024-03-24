import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { getWorkspacesByUser } from "~/model/workspace";
import { getUserByUsername } from "~/model/user";
import { useTranslation } from "react-i18next";

export const meta: MetaFunction = () => {
  const { t } = useTranslation();

  return [
    { title: t("user_info") + " | TFC App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  // const url = new URL(request.url);
  // invariant(params.usernane, "User not found")
  const username = params.username;
  const user = await getUserByUsername(username);
  if (!user) {
    throw new Error("User not found");
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

  return (
    <div className="container-primary-bg flex-1 flex flex-col">
      <h2>
        {user.name} {user.lastname}
      </h2>
    </div>
  );
}
