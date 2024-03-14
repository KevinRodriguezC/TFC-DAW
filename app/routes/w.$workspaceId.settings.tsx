import type {
  MetaFunction,
  LoaderFunctionArgs,
  ActionFunctionArgs,
} from "@remix-run/node";
import { Form, json, redirect, useLoaderData } from "@remix-run/react";
import { useTranslation } from "react-i18next";
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
  console.log(workspaceId);
  console.log(workspaceId);
  if (!workspaceId || !+workspaceId) {
    throw new Response("Error", { status: 400 });
  }
  const formData = await request.formData();
  const workspaceName = formData.get("workspaceName");
  let workspaceDescription = formData.get("workspaceDescription");
  if (!workspaceName || typeof workspaceName != "string") {
    throw new Response("Error", { status: 400 });
  }
  console.log("Hello world");
  if (!workspaceDescription || typeof workspaceDescription != "string") {
    workspaceDescription = "";
  }
  updateWorkspace(+workspaceId, workspaceName, workspaceDescription);

  return redirect("../");
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
  const description = workspaceInfo.description;
  return json({ name, description });
};

export default function Index() {
  const { name, description } = useLoaderData<typeof loader>();

  const { t } = useTranslation();

  return (
    <div className="container-primary-bg flex-1 flex flex-col gap-2 p-2 font-bold">
      <h2 className="text-2xl">{t("settings")}</h2>
      <Form method="POST" className="flex flex-col gap-2">
        <label htmlFor="workspaceName">{t("name")}</label>
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
        ></textarea>
        <input type="submit" value={t("save")} className="btn-primary" />
      </Form>
    </div>
  );
}
