import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getUserByUsername } from "~/model/user";
import { useTranslation } from "react-i18next";
import { WorkspaceContentContainer } from "~/components/workspaceContentContainer";
import { getWorkspaceEventsByUserId } from "~/model/events";
import { HistoryCard } from "~/components/historyCard";

export const meta: MetaFunction = () => {
  const { t } = useTranslation();

  return [
    { title: t("user_info") + " | TFC App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const workspaceId = params.workspaceId;
  if (!workspaceId || !+workspaceId) {
    throw new Response("Workspace not found", { status: 404 });
  }
  const username = params.username;
  const user = await getUserByUsername(username);
  if (!user) {
    throw new Response("User not found");
  }
  const events = await getWorkspaceEventsByUserId(user.id, +workspaceId);
  return json({ user, events });
};

export default function Participant() {
  let { user, events } = useLoaderData<typeof loader>();

  const { t } = useTranslation();

  return (
    <WorkspaceContentContainer>
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
      {events && events.length ? (
        <>
          <h3 className="text-xl">Activity</h3>
          <div className="flex flex-col gap-2">
            {events.map((event) => (
              <HistoryCard event={event} route="../" />
            ))}
          </div>
        </>
      ) : (
        <h3>{t("there_are_no_events")}</h3>
      )}
    </WorkspaceContentContainer>
  );
}
