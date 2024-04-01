import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { Form, MetaFunction } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import {
  createInvitationCode,
  deleteInvitation,
} from "~/model/invitationCodes";

export const meta: MetaFunction = () => {
  const { t } = useTranslation();

  return [
    { title: t("manage_invitations") + " | TFC App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function action({ params }: ActionFunctionArgs) {
  const invitationId = params.invitationId;
  if (!invitationId || !+invitationId) {
    return new Response("Workspace not found", { status: 404 });
  }
  deleteInvitation(+invitationId);
  return redirect("../");
}
