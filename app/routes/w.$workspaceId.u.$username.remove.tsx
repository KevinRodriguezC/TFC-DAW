import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";

import { getUserByUsername } from "~/model/user";
import { useTranslation } from "react-i18next";
import { getWorkspaceEventsByUserId } from "~/model/events";
import { getUserSession } from "~/getUserSession";
import { getSession } from "~/sessions";
import {
  getUserInWorkspace,
  getUserOnWorkspaceConnection,
  removeUser,
} from "~/model/workspace";

export async function action({ params }: ActionFunctionArgs) {
  const workspaceId = params.workspaceId;
  const username = params.username;
  if (!workspaceId || !+workspaceId || !username) {
    return new Response("Missing parameters", { status: 400 });
  }
  const user = await getUserByUsername(username);
  if (!user) {
    return new Response("The user does not exist", { status: 400 });
  }
  const userOnWorkspace = await getUserOnWorkspaceConnection(
    user.id,
    +workspaceId
  );
  if (!userOnWorkspace) {
    return new Response("The user isn't a participant of the workspace", {
      status: 400,
    });
  }

  removeUser(userOnWorkspace.id);
  return redirect("../../../");
}

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  // Get logged user info
  const { userInfo } = await getUserSession(
    await getSession(request.headers.get("Cookie"))
  );

  // Get url parameters
  const workspaceId = params.workspaceId;
  const username = params.username;

  // Check url parameters
  if (
    !workspaceId ||
    !+workspaceId ||
    !username ||
    typeof username != "string"
  ) {
    throw new Response("Workspace not found", { status: 404 });
  }

  // Get url user info and check if the user exist
  const user = await getUserByUsername(username);
  if (!user) {
    throw new Response("User not found", { status: 404 });
  }
  const userOnWorkspace = await getUserInWorkspace(+workspaceId, user.id);
  if (!userOnWorkspace) {
    throw new Response("User not found", { status: 404 });
  }

  // Get user events
  const events = await getWorkspaceEventsByUserId(user.id, +workspaceId);
  return json({
    user: {
      name: user.name,
      lastname: user.lastname,
      username: user.username,
      visibility: user.visibility,
      profilePictureColor: user.profilePictureColor,
    },
    userInfo,
    events,
  });
};

export default function Expel() {
  let { user, userInfo, events } = useLoaderData<typeof loader>();

  const { t } = useTranslation();

  return (
    <div className="container-primary-bg flex-1 flex flex-col">
      <div className="flex flex-1 flex-col items-center justify-center gap-5 p-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="128"
          height="128"
          fill="currentColor"
          className="bi bi-exclamation-triangle"
          viewBox="0 0 16 16"
        >
          <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z" />
          <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
        </svg>
        <p className="text-xl text-center">
          {userInfo.username == user.username
            ? t("are_you_sure_you_want_to_leave_this_workspace")
            : t("are_you_sure_you_want_to_expel_this_user", {
                username: user.name + " " + user.lastname,
              })}
        </p>
        <Form method="POST" className="flex gap-4 flex-wrap justify-center">
          <Link to="../" className="btn-primary">
            {t("no_go_back")}
          </Link>
          <input type="submit" className="btn-danger" value={t("yes")}></input>
        </Form>
      </div>
    </div>
  );
}
