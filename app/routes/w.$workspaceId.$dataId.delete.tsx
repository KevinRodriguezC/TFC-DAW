import type {
  MetaFunction,
  LoaderFunctionArgs,
  ActionFunctionArgs,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";

import {
  Link,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { useTranslation } from "react-i18next";

import { deleteDirectory, getDirectoryInfo } from "~/model/directory";

export const meta: MetaFunction = () => {
  const { t } = useTranslation();

  return [
    { title: t("delete_directory") + " | TFC App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function action({ params, request }: ActionFunctionArgs) {
  const directoryId = params.dataId;
  const workspaceId = params.workspaceId;
  if (!directoryId || !+directoryId || !workspaceId || !+workspaceId) {
    throw new Response("Error", { status: 400 });
  }
  deleteDirectory(+directoryId);

  return redirect("../../");
}

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

export default function Index() {
  const { data } = useLoaderData<typeof loader>();

  const { t } = useTranslation();

  return (
    <div className="container-primary-bg flex-1 flex flex-col">
      <div className="flex flex-1 flex-col items-center justify-center gap-5 p-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="128"
          height="128"
          fill="currentColor"
          className="bi bi-exclamation-triangle"
          viewBox="0 0 16 16"
        >
          <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z" />
          <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
        </svg>
        <p className="text-xl text-center">
          {t("are_you_sure_you_want_to_delete_directory", {
            directoryName: data.name,
          })}
        </p>
        <form method="POST" className="flex gap-4 flex-wrap justify-center">
          <Link to="../" className="btn-primary">
            {t("no_go_back")}
          </Link>
          <input type="submit" className="btn-danger" value={t("yes")}></input>
        </form>
      </div>
    </div>
  );
}
