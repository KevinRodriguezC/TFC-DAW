import { RadioGroup } from "@headlessui/react";
import {
  redirect,
  type MetaFunction,
  ActionFunctionArgs,
} from "@remix-run/node";
import { Form } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { MyRadioGroup } from "~/components/radioSelect";
import { createDirectory } from "~/model/directory";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function action({ params, request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const workspaceId = params.workspaceId;
  const workspaceName = formData.get("directoryName");
  if (
    !workspaceId ||
    !+workspaceId ||
    !workspaceName ||
    typeof workspaceName != "string"
  ) {
    throw new Response("Error", { status: 400 });
  }
  const newDirectory = await createDirectory(+workspaceId, workspaceName);

  return redirect("../" + newDirectory.id);
}

export default function Index() {
  const { t } = useTranslation();

  return (
    <div className="container-primary-bg flex-1 flex flex-col">
      <div className="p-2 border-b-2 container-primary-border">
        {t("new_directory")}
      </div>
      <Form className="flex flex-1 flex-col p-4 gap-4" method="POST">
        <label htmlFor="directoryName">{t("name")}</label>
        <input
          type="text"
          className="form-control"
          id="directoryMame"
          name="directoryName"
        />
        <label htmlFor="directoryName">{t("type")}</label>
        <MyRadioGroup
          name="directoryType"
          values={[
            { name: "note", visibleName: t("notes_view") },
            { name: "task", visibleName: t("tasks_view") },
            { name: "calendar", visibleName: t("calendar_view") },
          ]}
        ></MyRadioGroup>
        <input type="submit" className="btn-primary" value={t("create")} />
      </Form>
    </div>
  );
}
