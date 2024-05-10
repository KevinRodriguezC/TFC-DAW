import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { getSession } from "../sessions";

import { getWorkspacesByUser } from "~/model/workspace";

import { Header } from "../components/header";
import { getUserSession } from "~/getUserSession";
import { MainContainer } from "~/components/mainContainer";
import { useTranslation } from "react-i18next";
import { ButtonLink } from "~/components/buttonLink";

export const meta: MetaFunction = () => {
  const { t } = useTranslation();

  return [
    { title: t("workspaces") + " | TFC App" },
    { name: "description", content: "Workspaces" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const { userId } = await getUserSession(
    await getSession(request.headers.get("Cookie"))
  );
  const userWorkspaces = await getWorkspacesByUser(+userId);
  let workspaces = [];
  for (let i = 0; i < userWorkspaces.length; i++) {
    workspaces.push(userWorkspaces[i].workspace);
  }
  return json({ workspaces });
}

export default function Index() {
  const { workspaces } = useLoaderData<typeof loader>();

  const { t } = useTranslation();

  return (
    <MainContainer>
      <Header />
      <div className="xl:mx-auto xl:w-[1020px] flex flex-col gap-4 m-4 flex-1">
        {workspaces.length ? (
          <>
            <h2 className="text-2xl font-bold">{t("select_a_workspace")}</h2>
            {workspaces.map((workspace: any) => (
              <Link
                key={workspace.id}
                to={"/w/" + workspace.id}
                className="bg-slate-100 dark:bg-slate-800 py-2 px-4 flex flex-col gap-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-900 active:bg-slate-300 dark:active:bg-slate-950"
              >
                <h2 className="text-xl font-bold">{workspace.name}</h2>
                {workspace.description ? <h3>{workspace.description}</h3> : ""}
              </Link>
            ))}
          </>
        ) : (
          <h2 className="text-2xl font-bold">
            {t("you_dont_have_any_workspace_yet")}
          </h2>
        )}
        <div className="grid gap-4 md:grid-cols-2">
          <ButtonLink to="/w/new">{t("new_workspace")}</ButtonLink>
          <ButtonLink to="/join">{t("join_a_workspace")}</ButtonLink>
        </div>
      </div>
    </MainContainer>
  );
}
