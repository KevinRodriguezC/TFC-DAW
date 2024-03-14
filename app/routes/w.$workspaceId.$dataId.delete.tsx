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
  const dataId = params.dataId;
  if (!dataId || !+dataId) {
    throw new Response("Error", { status: 400 });
  }
  deleteDirectory(+dataId);

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
      <div className="flex flex-1 flex-col items-center justify-center">
        <p>
          {t("are_you_sure_you_want_to_delete_directory", {
            directoryName: data.name,
          })}
        </p>
        <form method="POST">
          <input type="submit" className="btn-danger" value={t("yes")}></input>
        </form>
      </div>
    </div>
  );
}
