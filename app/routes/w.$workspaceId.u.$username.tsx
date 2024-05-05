import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getUserByUsername } from "~/model/user";
import { useTranslation } from "react-i18next";
import { WorkspaceContentContainer } from "~/components/workspaceContentContainer";
import { getWorkspaceEventsByUserId } from "~/model/events";
import { HistoryCard } from "~/components/historyCard";
import { ButtonLink } from "~/components/buttonLink";
import { getUserSession } from "~/getUserSession";
import { getSession } from "~/sessions";
import { getUserInWorkspace } from "~/model/workspace";

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
    },
    userInfo,
    events,
  });
};

export default function Participant() {
  let { user, userInfo, events } = useLoaderData<typeof loader>();

  const { t } = useTranslation();

  return (
    <WorkspaceContentContainer>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <div className="bg-purple-600 rounded-full size-16 text-2xl btn-user-icon">
            {user.username.charAt(0)}
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold">
              {user.name} {user.lastname}
            </h2>
            <h4 className="text-md font-bold">@{user.username}</h4>
          </div>
        </div>
        <div>
          {user.visibility == 1 || user.username == userInfo.username ? (
            <ButtonLink to={"../../../../u/" + user.username}>
              Go to {user.visibility == 1 ? "public" : "private"} profile
            </ButtonLink>
          ) : (
            <h3>
              This user is a private user and doesn't have a public profile
            </h3>
          )}
        </div>
      </div>
      {events && events.length ? (
        <>
          <h3 className="text-xl">{t("activity")}</h3>
          <div className="flex flex-col gap-2">
            {events.map((event) => (
              <HistoryCard key={event.id} event={event} route="../" />
            ))}
          </div>
        </>
      ) : (
        <h3>{t("there_are_no_events")}</h3>
      )}
    </WorkspaceContentContainer>
  );
}
