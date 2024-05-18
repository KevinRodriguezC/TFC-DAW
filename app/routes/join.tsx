import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { getSession } from "../sessions";
import { useTranslation } from "react-i18next";
import { getUserSession } from "~/getUserSession";
import { manageLogin } from "~/manageLogin";
import { Header } from "../components/header";
import { MainContainer } from "~/components/mainContainer";
import { addUserToWorkspace, getUserInWorkspace } from "~/model/workspace";
import { getCodeFromWorkspace } from "~/model/invitationCodes";
import { cardInfo } from "~/cardGenerator";

export const meta: MetaFunction = () => {
  const { t } = useTranslation();
  return cardInfo(t("join_workspace"), t("join_workspace") + " | TFC App");
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

export async function action({ request }: ActionFunctionArgs) {
  // Get the user session
  let { userId } = await getUserSession(
    await getSession(request.headers.get("Cookie"))
  );

  // Get form data
  const formData = await request.formData();

  // Get code data
  let code = formData.get("code");
  if (!code || typeof code != "string" || !userId || !+userId) {
    throw new Response("Error", { status: 400 });
  }

  // Split the code data
  const { workspaceId, codeString } = splitCode(code);

  // Get the code from the database
  const workspaceCode = await getCodeFromWorkspace(workspaceId, codeString);
  if (workspaceCode) {
    // If the code is a valid code

    // Check if the user is a participant of the workspace
    const userOnWorkspace = await getUserInWorkspace(+workspaceId, +userId);
    if (!userOnWorkspace) {
      // Add the user to the workspace
      await addUserToWorkspace(+workspaceId, +userId, 0);
    }

    // Redirect the user to the workspace
    return redirect("/w/" + workspaceId);
  } else {
    // If the code isn't a valid code
    return redirect("/join");
  }
}

export async function loader({ request }: LoaderFunctionArgs) {
  // Get the user session
  const { userInfo } = await getUserSession(
    await getSession(request.headers.get("Cookie"))
  );

  return json({ userInfo });
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
