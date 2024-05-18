import type {
  MetaFunction,
  LoaderFunctionArgs,
  ActionFunctionArgs,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";

import { Form, Link, useFetcher, useLoaderData } from "@remix-run/react";
// import { useState } from "react";
import { useTranslation } from "react-i18next";
import { getUserSession } from "~/getUserSession";

import { getDirectoryInfo, updateDirectory } from "~/model/directory";
import { addEvent } from "~/model/events";
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
  const directoryId = params.dataId;
  const workspaceId = params.workspaceId;
  if (!directoryId || !+directoryId || !workspaceId || !+workspaceId) {
    throw new Response("Directory not found", { status: 404 });
  }
  const data = await getDirectoryInfo(+directoryId);
  if (!data || data.parentId != +workspaceId) {
    throw new Response("Directory not found", { status: 404 });
  }
  return json({ data, canEdit: userId != undefined });
};

export async function action({ params, request }: ActionFunctionArgs) {
  const userId = (await getSession(request.headers.get("Cookie"))).get(
    "userId"
  );
  const directoryId = params.dataId;
  const workspaceId = params.workspaceId;
  const formData = await request.formData();
  const name = formData.get("name");
  const description = formData.get("description");
  if (
    !directoryId ||
    !+directoryId ||
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
  updateDirectory(+directoryId, name, description);
  addEvent(1, 1, +directoryId, +userId, +workspaceId, name, description);

  return redirect("");
}

export default function Index() {
  const { data, canEdit } = useLoaderData<typeof loader>();
  const { t } = useTranslation();

  // const [name, setName] = useState(data.name);
  // const [description, useDescription] = useState(data.name);

  // const fetcher = useFetcher();

  // const fetchForm = () => {
  //   fetcher.submit(
  //     { name: "values", description: "description" },
  //     { method: "POST" }
  //   );
  // };

  return (
    <Form
      className="container-primary-bg flex-1 flex flex-col"
      method="POST"
      key={data.id}
    >
      <div className="border-b-2 container-primary-border flex items-stretch">
        <input
          type="text"
          name="name"
          defaultValue={data.name}
          className="data-input text-xl font-bold flex-1"
          maxLength={191}
          disabled={!canEdit}
        />
        {canEdit ? (
          <div className="flex gap-2 p-2">
            <input type="submit" value={t("save")} className="btn-primary" />
            <Link to="delete" className="btn-danger">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash-fill"
                viewBox="0 0 16 16"
              >
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
              </svg>
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>
      <textarea
        name="description"
        className="data-input flex-1 resize-none"
        defaultValue={data.description ? data.description : ""}
        disabled={!canEdit}
      ></textarea>
    </Form>
  );
}
