import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getUserByUsername } from "~/model/user";
import { useTranslation } from "react-i18next";
import { WorkspaceContentContainer } from "~/components/workspaceContentContainer";

export const meta: MetaFunction = () => {
  const { t } = useTranslation();

  return [
    { title: t("user_info") + " | TFC App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const username = params.username;
  const user = await getUserByUsername(username);
  if (!user) {
    throw new Response("User not found");
  }
  return json({ user });
};

export default function Participant() {
  let { user } = useLoaderData<typeof loader>();

  return (
    <div className="container-primary-bg flex-1 flex flex-col">
      <WorkspaceContentContainer>
        <h2>
          {user.name} {user.lastname}
        </h2>
      </WorkspaceContentContainer>
    </div>
  );
}
