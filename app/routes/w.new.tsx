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
  createWorkspace(+userId, workspaceName, workspaceDescription, 0);

  return redirect("/app");
}

export async function loader({ request }: LoaderFunctionArgs) {
  let { userInfo } = await getUserSession(
    await getSession(request.headers.get("Cookie"))
  );
  return json({ userInfo });
}

export default function Index() {
  let { userInfo } = useLoaderData<typeof loader>();

  const { t } = useTranslation();

  return (
    <div className="flex-1 flex flex-col dark:text-white dark:bg-slate-700 min-h-screen">
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
    </div>
  );
}
