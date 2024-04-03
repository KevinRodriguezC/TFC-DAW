import type {
  MetaFunction,
  LoaderFunctionArgs,
  ActionFunctionArgs,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";

import {
  Form,
  Link,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { JSX } from "react/jsx-runtime";
import ErrorComponent from "~/components/errorComponent";
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

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const directoryId = params.dataId;
  if (!directoryId) {
    throw new Response("Directory not found", { status: 404 });
  }
  const directoryInfoNumber = +directoryId;
  if (!directoryInfoNumber) {
    throw new Response("Directory not found", { status: 404 });
  }
  const data = await getDirectoryInfo(+directoryId);
  if (!data) {
    throw new Response("Directory not found", { status: 404 });
  }
  return json({ data });
};

export async function action({ params, request }: ActionFunctionArgs) {
  const userId = (await getSession(request.headers.get("Cookie"))).get(
    "userId"
  );
  const dataId = params.dataId;
  const workspaceId = params.workspaceId;
  const formData = await request.formData();
  const name = formData.get("name");
  const description = formData.get("description");
  if (
    !dataId ||
    !+dataId ||
    !workspaceId ||
    !+workspaceId ||
    !name ||
    typeof name != "string" ||
    typeof description != "string"
  ) {
    throw new Response("Error", { status: 400 });
  }
  if (!userId || !+userId) {
    throw new Response("Error");
  }
  updateDirectory(+dataId, name, description);
  addEvent(1, 1, +dataId, +userId, +workspaceId, name, description);

  return redirect("");
}

export function ErrorBoundary() {
  let error = useRouteError();
  console.log(error);
  return ErrorComponent(error);
}

export default function Index() {
  const { data } = useLoaderData<typeof loader>();

  const { t } = useTranslation();

  let saveIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-floppy-fill"
      viewBox="0 0 16 16"
    >
      <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0H3v5.5A1.5 1.5 0 0 0 4.5 7h7A1.5 1.5 0 0 0 13 5.5V0h.086a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5H14v-5.5A1.5 1.5 0 0 0 12.5 9h-9A1.5 1.5 0 0 0 2 10.5V16h-.5A1.5 1.5 0 0 1 0 14.5z" />
      <path d="M3 16h10v-5.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5zm9-16H4v5.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5zM9 1h2v4H9z" />
    </svg>
  );

  function renderTosString(
    saveIcon: JSX.Element
  ): string | number | readonly string[] | undefined {
    throw new Error("Function not implemented.");
  }

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
        />
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
      </div>
      <textarea
        name="description"
        className="data-input flex-1 resize-none"
        defaultValue={data.description ? data.description : ""}
      ></textarea>
    </Form>
  );
}
