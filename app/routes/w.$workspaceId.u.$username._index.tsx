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
import { UserProfilePicture } from "~/components/userProfilePicture";
import { Menu } from "@headlessui/react";

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
  let { user, userInfo, events } = useLoaderData<typeof loader>();

  const { t } = useTranslation();

  return (
    <WorkspaceContentContainer>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <UserProfilePicture user={user} size="size-16 text-2xl shrink-0" />
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold">
              {user.name} {user.lastname}
            </h2>
            <h4 className="text-md font-bold">@{user.username}</h4>
          </div>
        </div>
        <div className="flex gap-2 items-start">
          {user.visibility == 1 || user.username == userInfo.username ? (
            <ButtonLink to={"/u/" + user.username}>
              Go to {user.visibility == 1 ? "public" : "private"} profile
            </ButtonLink>
          ) : (
            <h3>{t("this_user_is_a_private_user")}</h3>
          )}
          <div className="relative flex">
            <Menu>
              <Menu.Button className="btn-primary-small-square flex size-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="bi bi-three-dots"
                  viewBox="0 0 16 16"
                >
                  <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                </svg>
              </Menu.Button>
              <Menu.Items className="absolute top-11 right-0 p-2 bg-slate-100 dark:bg-slate-800 rounded-md border-slate-200 dark:border-slate-900 border-2">
                <Menu.Item>
                  <ButtonLink to="./remove">
                    {t(
                      user.username == userInfo.username
                        ? "leave_workspace"
                        : "expel_user"
                    )}
                  </ButtonLink>
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </div>
        </div>
      </div>
      {events && events.length ? (
        <>
          <h3 className="text-xl">{t("activity")}</h3>
          <div className="flex flex-col gap-2">
            {events.map((event) => (
              <HistoryCard key={event.id} event={event} route="../version/" />
            ))}
          </div>
        </>
      ) : (
        <h3>{t("there_are_no_events")}</h3>
      )}
    </WorkspaceContentContainer>
  );
}
