import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData, useRouteError } from "@remix-run/react";

import { getWorkspacesByUser } from "~/model/workspace";
import { getUserByUsername } from "~/model/user";
import { useTranslation } from "react-i18next";
import { getUserSession } from "~/getUserSession";
import { getSession } from "~/sessions";
import { UserProfilePicture } from "~/components/userProfilePicture";
import { cardInfo } from "~/cardGenerator";
import UserPageError from "~/components/userPageError";
import { manageLogin } from "~/manageLogin";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const { t } = useTranslation();

  // Check if there is loader data
  if (!data) {
    // If there isn't loader data send a generic response

    return cardInfo(t("user_info") + " | TFC App", t("user_info"));
  } else {
    // If there is loader data send the user information

    const { user, workspaces } = data;

    return cardInfo(
      user.name + " " + user.lastname + " | TFC App",
      "Username: u/" +
        user.username +
        ", Public workspaces: " +
        workspaces.length +
        " | TFC App"
    );
  }
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  // Get the user id
  const { userId, userInfo } = await getUserSession(
    await getSession(request.headers.get("Cookie"))
  );

  // Get the username
  const username = params.username;
  const user = await getUserByUsername(username);

  // If the user does not exist
  if (!user) {
    throw new Response("User not found", { status: 404 });
  }

  // If the user is a private user
  if (user.visibility == 0 && user.id != userId) {
    throw new Response("This user is a private user", { status: 403 });
  }

  // Get the user workspaces
  const userWorkspaces = await getWorkspacesByUser(user.id);

  // Add the workspaces to the user information
  let workspaces = [];
  for (let i = 0; i < userWorkspaces.length; i++) {
    if (userWorkspaces[i].workspace.visibility == 0 && userId)
      workspaces.push(userWorkspaces[i].workspace);
  }

  return json({ user, workspaces, userInfo });
};

export function ErrorBoundary() {
  let error = useRouteError();
  // Print the error
  console.log(error);

  // Render the error message
  return <UserPageError error={error} />;
}

export default function UserInfo() {
  let { user, workspaces, userInfo } = useLoaderData<typeof loader>();
  const { t } = useTranslation();

  manageLogin(userInfo);

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
              <h2 className="text-xl font-bold word-wrap-break-word">
                {workspace.name}
              </h2>
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
