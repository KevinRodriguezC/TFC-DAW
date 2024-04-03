import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { getSession } from "../sessions";

import { createWorkspace } from "~/model/workspace";

import Header from "../components/header";
import { useTranslation } from "react-i18next";
import { getUserSession } from "~/getUserSession";
import { MainContainer } from "~/components/mainContainer";
import { addEvent } from "~/model/events";

export const meta: MetaFunction = () => {
  const { t } = useTranslation();

  return [
    { title: t("new_workspace") + " | TFC App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function action({ params, request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  let userId = session.get("userId");
  const formData = await request.formData();
  let workspaceName = formData.get("workspaceName");
  let workspaceDescription = formData.get("workspaceDescription");
  if (
    !workspaceName ||
    !workspaceDescription ||
    !userId ||
    typeof workspaceName != "string" ||
    typeof workspaceDescription != "string" ||
    !+userId
  ) {
    throw new Response("Error", { status: 400 });
  }
  const workspace = await createWorkspace(
    +userId,
    workspaceName,
    workspaceDescription,
    0
  );
  addEvent(
    0,
    0,
    workspace.id,
    workspace.id,
    +userId,
    workspaceName,
    workspaceDescription
  );

  return redirect("/app");
}

export async function loader({ request }: LoaderFunctionArgs) {
  let { userInfo } = await getUserSession(
    await getSession(request.headers.get("Cookie"))
  );
  return json({ userInfo });
}

export default function NewWorkspace() {
  let { userInfo } = useLoaderData<typeof loader>();

  const { t } = useTranslation();

  return (
    <MainContainer>
      <Header username={userInfo.username} name={userInfo.name}></Header>
      <div className="xl:mx-auto xl:w-[1020px] flex flex-col gap-4 m-4 flex-1">
        <form method="POST" className="flex flex-col gap-2">
          <label htmlFor="workspaceName">{t("name")}</label>
          <input
            type="text"
            className="form-control"
            name="workspaceName"
            required
          ></input>
          <label htmlFor="workspaceDescription">{t("description")}</label>
          <textarea
            className="form-control"
            name="workspaceDescription"
          ></textarea>
          <input
            type="submit"
            className="btn-primary"
            value={t("create")}
          ></input>
        </form>
      </div>
    </MainContainer>
  );
}
