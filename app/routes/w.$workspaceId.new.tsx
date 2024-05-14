import { RadioGroup } from "@headlessui/react";
import {
  redirect,
  type MetaFunction,
  ActionFunctionArgs,
} from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { WorkspaceContentContainer } from "~/components/workspaceContentContainer";
import { MyRadioGroup } from "~/components/radioSelect";
import { createDirectory } from "~/model/directory";
import { getUserSession } from "~/getUserSession";
import { getSession } from "~/sessions";
import { addEvent } from "~/model/events";

export const meta: MetaFunction = () => {
  const { t } = useTranslation();

  return [
    { title: t("new_directory") + " | TFC App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function action({ params, request }: ActionFunctionArgs) {
  let { userId } = await getUserSession(
    await getSession(request.headers.get("Cookie"))
  );
  const formData = await request.formData();
  const workspaceId = params.workspaceId;
  const directoryName = formData.get("directoryName");
  if (
    !workspaceId ||
    !+workspaceId ||
    !directoryName ||
    typeof directoryName != "string"
  ) {
    throw new Response("Error", { status: 400 });
  }
  const newDirectory = await createDirectory(+workspaceId, directoryName);
  await addEvent(
    1,
    0,
    newDirectory.id,
    +userId,
    +workspaceId,
    directoryName,
    ""
  );

  return redirect("../" + newDirectory.id);
}

export default function Index() {
  const { t } = useTranslation();

  return (
    <WorkspaceContentContainer>
      <div className="text-2xl font-bold">{t("new_directory")}</div>
      <Form className="flex flex-col gap-4" method="POST">
        <label htmlFor="directoryName">{t("name")}</label>
        <input
          type="text"
          className="form-control"
          id="directoryMame"
          name="directoryName"
          maxLength={191}
        />
        {/* <label htmlFor="directoryName">{t("type")}</label>
        <MyRadioGroup
          name="directoryType"
          values={[
            { name: "note", visibleName: t("notes_view") },
            { name: "task", visibleName: t("tasks_view") },
            { name: "calendar", visibleName: t("calendar_view") },
          ]}
        ></MyRadioGroup> */}
        <input type="submit" className="btn-primary" value={t("create")} />
      </Form>
    </WorkspaceContentContainer>
  );
}
