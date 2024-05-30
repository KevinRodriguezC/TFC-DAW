import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";

import { getUserByUsername } from "~/model/user";
import { useTranslation } from "react-i18next";
import { WorkspaceContentContainer } from "~/components/workspaceContentContainer";
import { getWorkspaceEventsByUserId } from "~/model/events";
import { HistoryCard } from "~/components/historyCard";
import { ButtonLink } from "~/components/buttonLink";
import { getUserSession } from "~/getUserSession";
import { getSession } from "~/sessions";
import { getUserInWorkspace } from "~/model/workspace";
import { UserProfilePicture } from "~/components/userProfilePicture";
import { Menu } from "@headlessui/react";

export const meta: MetaFunction = () => {
  const { t } = useTranslation();

  return [
    { title: t("user_info") + " | TFC App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

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

export default function Participant() {
  const { t } = useTranslation();

  return <Outlet />;
}
