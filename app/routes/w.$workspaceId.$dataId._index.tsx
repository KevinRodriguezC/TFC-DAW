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
import ErrorComponent from "~/components/errorComponent";

import { getDirectoryInfo, updateDirectory } from "~/model/directory";

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
  const dataId = params.dataId;
  const formData = await request.formData();
  const name = formData.get("name");
  const description = formData.get("description");
  if (
    !dataId ||
    !+dataId ||
    !name ||
    typeof name != "string" ||
    typeof description != "string"
  ) {
    throw new Response("Error", { status: 400 });
  }
  updateDirectory(+dataId, name, description);

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
          className="data-input flex-1"
        />
        <div className="flex gap-2 p-2">
          <input type="submit" value={t("save")} className="btn-primary" />
          <Link to="delete" className="btn-danger">
            {t("delete")}
          </Link>
        </div>
      </div>
      <textarea
        name="description"
        className="data-input"
        defaultValue={data.description ? data.description : ""}
      ></textarea>
      <div className="flex flex-1 flex-col items-center justify-center">
        Lorem ipsum
      </div>
    </Form>
  );
}
