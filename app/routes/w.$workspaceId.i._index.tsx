import { LoaderFunctionArgs, json, type MetaFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { ButtonLink } from "~/components/buttonLink";
import { WorkspaceContentContainer } from "~/components/workspaceContentContainer";
import { getUserSession } from "~/getUserSession";
import { getInvitationCodesByWorkspace } from "~/model/invitationCodes";
import { getSession } from "~/sessions";

export const meta: MetaFunction = () => {
  const { t } = useTranslation();

  return [
    { title: t("manage_invitations") + " | TFC App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const workspaceId = params.workspaceId;
  if (!workspaceId || !+workspaceId) {
    throw new Response("Workspace not found", { status: 404 });
  }
  const workspaceIdNumber = +workspaceId;
  const invitationCodes = await getInvitationCodesByWorkspace(
    workspaceIdNumber
  );
  if (!invitationCodes) {
    return new Response("Workspace not found", { status: 404 });
  }

  return json({ invitationCodes, workspaceId });
};

export default function Invitations() {
  const { invitationCodes, workspaceId } = useLoaderData<typeof loader>();

  const { t } = useTranslation();

  return (
    <WorkspaceContentContainer>
      <h2 className="text-2xl font-bold">{t("manage_invitations")}</h2>
      {invitationCodes.length ? (
        invitationCodes.map((invitationCode: any) => (
          <div
            key={invitationCode.id}
            className="rounded-lg bg-slate-100 dark:bg-slate-800 p-2 flex justify-between"
          >
            <h3 className="text-xl font-bold">
              {workspaceId + "/" + invitationCode.code}
            </h3>
            <div className="self-center">
              <Form method="post" action={`${invitationCode.id}/delete`}>
                <input
                  type="submit"
                  value={t("delete")}
                  className="btn-danger"
                />
              </Form>
            </div>
          </div>
        ))
      ) : (
        <div>{t("you_dont_have_any_invitation_code_yet")}</div>
      )}
      <ButtonLink to="new">{t("new_invitation")}</ButtonLink>
    </WorkspaceContentContainer>
  );
}
