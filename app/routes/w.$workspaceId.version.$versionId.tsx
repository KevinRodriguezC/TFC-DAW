import type {
  MetaFunction,
  LoaderFunctionArgs,
  ActionFunctionArgs,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { getUserSession } from "~/getUserSession";
import { getDirectoryInfo, updateDirectory } from "~/model/directory";
import { addEvent, getEventById } from "~/model/events";
import { getUserInfo } from "~/model/user";
import { getSession } from "~/sessions";

export const meta: MetaFunction = () => {
  const { t } = useTranslation();

  return [
    { title: t("directory") + " | TFC App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const { userId } = await getUserSession(
    await getSession(request.headers.get("Cookie"))
  );
  const versionId = params.versionId;
  const workspaceId = params.workspaceId;
  if (!versionId || !+versionId || !workspaceId || !+workspaceId) {
    throw new Response("Directory not found", { status: 404 });
  }
  let oldData = await getEventById(+versionId);
  console.log(oldData);
  if (!oldData) {
    throw new Response("Directory not found", { status: 404 });
  }
  const data = await getDirectoryInfo(oldData.row);
  const editorInfo = await getUserInfo(oldData.userId);
  if (!data || data.parentId != +workspaceId || !editorInfo) {
    throw new Response("Directory not found", { status: 404 });
  }

  return json({
    oldData,
    data,
    canEdit: userId != undefined,
    editorInfo: { name: editorInfo.name, username: editorInfo.username },
  });
};

export async function action({ params, request }: ActionFunctionArgs) {
  try {
    const userId = (await getSession(request.headers.get("Cookie"))).get(
      "userId"
    );
    const versionId = params.versionId;
    const workspaceId = params.workspaceId;
    const formData = await request.formData();
    const name = formData.get("name");
    const description = formData.get("description");
    if (
      !versionId ||
      !+versionId ||
      !workspaceId ||
      !+workspaceId ||
      !name ||
      !userId ||
      !+userId ||
      typeof name != "string" ||
      typeof description != "string"
    ) {
      throw new Response("Error", { status: 400 });
    }
    const versionInfo = await getEventById(+versionId);
    if (!versionInfo) {
      throw new Response("Error", { status: 400 });
    }
    updateDirectory(+versionInfo.row, name, description);
    addEvent(1, 3, +versionInfo.row, +userId, +workspaceId, name, description);

    return redirect("../" + versionInfo.row);
  } catch (e) {
    console.log(e);
    return new Response("Internal server error", { status: 500 });
  }
}

export default function VersionPage() {
  const { oldData, data, canEdit } = useLoaderData<typeof loader>();
  const { t } = useTranslation();
  console.log(oldData);

  return (
    <Form className="flex flex-col flex-1" method="POST" key={oldData.id}>
      <div className="p-2">
        {canEdit && (
          <input type="submit" value={t("restore")} className="btn-primary" />
        )}
      </div>
      <div className="grid grid-rows-[50px_1fr] grid-cols-2 flex-1 grid-flow-col">
        <div className="data-input resize-none">{data && data.name}</div>
        <div className="data-input resize-none">{data && data.description}</div>
        <input
          type="text"
          name="name"
          defaultValue={oldData.name ? oldData.name : ""}
          className="data-input text-xl font-bold"
          disabled={!canEdit}
        />
        <textarea
          name="description"
          className="data-input flex-1 resize-none"
          defaultValue={oldData.value ? oldData.value : ""}
          disabled={!canEdit}
        ></textarea>
        {/* </div> */}
      </div>
    </Form>
  );
}
