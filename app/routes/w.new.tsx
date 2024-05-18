import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { getSession } from "../sessions";
import { createWorkspace } from "~/model/workspace";
import { Header } from "../components/header";
import { useTranslation } from "react-i18next";
import { getUserSession } from "~/getUserSession";
import { MainContainer } from "~/components/mainContainer";
import { addEvent } from "~/model/events";
import { Form, useLoaderData } from "@remix-run/react";
import { manageLogin } from "~/manageLogin";
import { cardInfo } from "~/cardGenerator";

export const meta: MetaFunction = () => {
  const { t } = useTranslation();

  return cardInfo(t("new_workspace") + " | TFC App", t("new_workspace"));
};

export async function action({ params, request }: ActionFunctionArgs) {
  // Get user id
  const { userId } = await getUserSession(
    await getSession(request.headers.get("Cookie"))
  );

  // Get the POST parameters
  const formData = await request.formData();
  let workspaceName = formData.get("workspaceName");
  let workspaceDescription = formData.get("workspaceDescription");

  // Set the workspace description to "" if it's null
  if (!workspaceDescription) {
    workspaceDescription = "";
  }

  // Check if all parameters exist
  if (
    !workspaceName ||
    typeof workspaceName != "string" ||
    !userId ||
    !+userId ||
    typeof workspaceDescription != "string"
  ) {
    throw new Response("Error", { status: 400 });
  }

  // Create the workspace
  const workspace = await createWorkspace(
    +userId,
    workspaceName,
    workspaceDescription,
    0
  );

  // Create the event
  addEvent(
    0,
    0,
    workspace.id,
    workspace.id,
    +userId,
    workspaceName,
    workspaceDescription
  );

  // Redirect the user to the workspace
  return redirect("/w");
}

export async function loader({ request }: LoaderFunctionArgs) {
  // Get the user iformation
  let { userInfo } = await getUserSession(
    await getSession(request.headers.get("Cookie"))
  );

  return json({ userInfo });
}

export default function NewWorkspace() {
  const { userInfo } = useLoaderData<typeof loader>();

  const { t } = useTranslation();

  manageLogin(userInfo);

  return (
    <MainContainer>
      <Header />
      <div className="xl:mx-auto xl:w-[1020px] flex flex-col gap-4 m-4 flex-1">
        <h2 className="text-2xl font-bold">{t("new_workspace")}</h2>
        <Form method="POST" className="flex flex-col gap-4">
          <label htmlFor="workspaceName">{t("name")}</label>
          <input
            type="text"
            className="form-control"
            name="workspaceName"
            maxLength={191}
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
        </Form>
      </div>
    </MainContainer>
  );
}
