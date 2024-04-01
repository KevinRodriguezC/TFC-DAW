import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { Form, MetaFunction } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { createInvitationCode } from "~/model/invitationCodes";

export const meta: MetaFunction = () => {
  const { t } = useTranslation();

  return [
    { title: t("manage_invitations") + " | TFC App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  const code = String(formData.get("code"));
  const workspaceId = params.workspaceId;
  if (!workspaceId || !+workspaceId) {
    return new Response("Workspace not found", { status: 404 });
  }
  if (!code) {
    return new Response("Incorrect values");
  }
  createInvitationCode(code, +workspaceId);
  return redirect("../");
}

export default function Invitations() {
  const { t } = useTranslation();

  return (
    <div className="container-primary-bg flex-1 flex flex-col gap-2 p-2">
      <h2 className="text-2xl font-bold">{t("new_invitation_code")}</h2>
      <Form method="post" className="flex flex-col gap-2">
        <input type="text" className="form-control" name="code" />
        <input type="submit" className="btn-primary" value={t("create")} />
      </Form>
    </div>
  );
}
