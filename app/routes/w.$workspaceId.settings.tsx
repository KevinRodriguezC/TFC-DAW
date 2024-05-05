import type {
  MetaFunction,
  LoaderFunctionArgs,
  ActionFunctionArgs,
} from "@remix-run/node";
import { Form, json, redirect, useLoaderData } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { Toogle } from "~/components/toggle";
import { WorkspaceContentContainer } from "~/components/workspaceContentContainer";
import { getWorkspaceById, updateWorkspace } from "~/model/workspace";

export const meta: MetaFunction = () => {
  const { t } = useTranslation();

  return [
    { title: t("delete_directory") + " | TFC App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function action({ params, request }: ActionFunctionArgs) {
  const workspaceId = params.workspaceId;
  if (!workspaceId || !+workspaceId) {
    throw new Response("Error", { status: 400 });
  }
  const formData = await request.formData();
  const workspaceName = formData.get("workspaceName");
  let workspaceDescription = formData.get("workspaceDescription");
  const workspaceVisibility = formData.get("visibility");
  if (!workspaceName || typeof workspaceName != "string") {
    throw new Response("Error", { status: 400 });
  }
  if (!workspaceDescription || typeof workspaceDescription != "string") {
    workspaceDescription = "";
  }
  updateWorkspace(
    +workspaceId,
    workspaceName,
    workspaceDescription,
    workspaceVisibility ? 1 : 0
  );

  return redirect("");
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const workspaceId = params.workspaceId;
  if (!workspaceId || !+workspaceId) {
    throw new Response("Workspace not found", { status: 404 });
  }

  const workspaceInfo = await getWorkspaceById(+workspaceId);
  if (!workspaceInfo) {
    throw new Response("Workspace not found", { status: 404 });
  }
  const name = workspaceInfo.name;
  const description = workspaceInfo.description
    ? workspaceInfo.description
    : "";
  const visibility = workspaceInfo.visibility != 0;
  return json({ name, description, visibility });
};

export default function Index() {
  const { name, description, visibility } = useLoaderData<typeof loader>();

  const { t } = useTranslation();

  return (
    <WorkspaceContentContainer>
      <h2 className="text-2xl font-bold">{t("settings")}</h2>
      <Form method="POST" className="flex flex-col gap-4">
        <label htmlFor="workspdescriptionaceName">{t("name")}</label>
        <input
          name="workspaceName"
          id="workspaceName"
          className="form-control"
          defaultValue={name}
        />
        <label htmlFor="workspaceDescription">{t("description")}</label>
        <textarea
          name="workspaceDescription"
          id="workspaceDescription"
          className="form-control"
          defaultValue={description}
        ></textarea>
        <label>{t("visibility")}</label>
        <div className="flex p-2 bg-slate-100 dark:bg-slate-800 rounded-md items-center pointer">
          <label className="flex-1" htmlFor="visibility">
            {t("public_profile")}
          </label>
          <Toogle inputName="visibility" defaultValue={visibility}></Toogle>
        </div>
        <input type="submit" value={t("save")} className="btn-primary" />
      </Form>
    </WorkspaceContentContainer>
  );
}
