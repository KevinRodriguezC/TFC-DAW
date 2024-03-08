import { RadioGroup } from "@headlessui/react";
import {
  redirect,
  type MetaFunction,
  ActionFunctionArgs,
} from "@remix-run/node";
import { Form } from "@remix-run/react";
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
  createDirectory(+workspaceId, workspaceName);

  return redirect("");
}

export default function Index() {
  return (
    <div className="container-primary-bg flex-1 flex flex-col">
      <div className="p-2 border-b-2 container-primary-border">New</div>
      <Form className="flex flex-1 flex-col p-4 gap-4" method="POST">
        <label htmlFor="directoryName">Name</label>
        <input
          type="text"
          className="form-control"
          id="directoryMame"
          name="directoryName"
        />
        <label htmlFor="directoryName">Type</label>
        <MyRadioGroup
          name="directoryType"
          values={[
            { name: "note", visibleName: "Note view" },
            { name: "task", visibleName: "Task view" },
            { name: "calendar", visibleName: "Calendar view" },
          ]}
        ></MyRadioGroup>
        <input type="submit" className="btn-primary" value="Create" />
      </Form>
    </div>
  );
}
