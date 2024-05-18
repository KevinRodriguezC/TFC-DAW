import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";

import { getSession } from "../sessions";

import {
  addUserToWorkspace,
  getUserInWorkspace,
  getWorkspacesByUser,
} from "~/model/workspace";

import { Header } from "../components/header";
import { getUserSession } from "~/getUserSession";
import { MainContainer } from "~/components/mainContainer";
import { useTranslation } from "react-i18next";
import { ButtonLink } from "~/components/buttonLink";
import { getCodeFromWorkspace } from "~/model/invitationCodes";
import { addEvent } from "~/model/events";
import Workspace from "./w";
import { manageLogin } from "~/manageLogin";

export const meta: MetaFunction = () => {
  const { t } = useTranslation();

  return [
    { title: t("workspaces") + " | TFC App" },
    { name: "description", content: "Workspaces" },
  ];
};

function splitCode(code: String) {
  const dividerPosition = code.indexOf("/");
  const workspaceIdString = code.slice(0, dividerPosition);
  const codeString = code.slice(dividerPosition + 1);
  if (!+workspaceIdString) {
    throw new Error();
  }
  const workspaceId = +workspaceIdString;
  return { workspaceId, codeString };
}

export async function action({ params, request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  let userId = session.get("userId");
  const formData = await request.formData();
  let code = formData.get("code");
  if (!code || typeof code != "string" || !userId || !+userId) {
    throw new Response("Error", { status: 400 });
  }
  const { workspaceId, codeString } = splitCode(code);
  const workspaceCode = await getCodeFromWorkspace(workspaceId, codeString);
  console.log(workspaceId, codeString, workspaceCode);
  if (workspaceCode) {
    const userOnWorkspace = await getUserInWorkspace(+workspaceId, +userId);
    console.log(userOnWorkspace);
    if (!userOnWorkspace) {
      await addUserToWorkspace(+workspaceId, +userId, 0);
    }
    return redirect("/w/" + workspaceId);
  } else {
    return redirect("/join");
  }
  // addEvent(
  //   0,
  //   0,
  //   workspace.id,
  //   workspace.id,
  //   +userId,
  //   workspaceName,
  //   workspaceDescription
  // );
}

export async function loader({ request }: LoaderFunctionArgs) {
  const { userId, userInfo } = await getUserSession(
    await getSession(request.headers.get("Cookie"))
  );
  const userWorkspaces = await getWorkspacesByUser(+userId);
  let workspaces = [];
  for (let i = 0; i < userWorkspaces.length; i++) {
    workspaces.push(userWorkspaces[i].workspace);
  }
  return json({ userInfo, workspaces });
}

export default function Index() {
  const { userInfo } = useLoaderData<typeof loader>();

  const { t } = useTranslation();

  manageLogin(userInfo);

  return (
    <MainContainer>
      <Header />
      <div className="xl:mx-auto xl:w-[1020px] flex flex-col gap-4 m-4 flex-1">
        <h2 className="text-2xl font-bold">{t("join_a_workspace")}</h2>
        <Form method="POST" className="flex flex-col gap-4">
          <input className="form-control" name="code" required />
          <input type="submit" className="btn-primary" value={t("join")} />
        </Form>
      </div>
    </MainContainer>
  );
}
