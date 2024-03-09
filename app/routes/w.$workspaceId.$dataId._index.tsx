import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";

import {
  Link,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import ErrorComponent from "~/components/errorComponent";

import { getDirectoryInfo } from "~/model/directory";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
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

export function ErrorBoundary() {
  let error = useRouteError();
  console.log(error);
  return ErrorComponent(error);
}

export default function Index() {
  const { data } = useLoaderData<typeof loader>();

  return (
    <div className="container-primary-bg flex-1 flex flex-col">
      <div className="p-2 border-b-2 container-primary-border flex justify-between items-center">
        <h2>{data.name}</h2>
        <div>
          <Link to="delete" className="btn-danger">
            Delete
          </Link>
        </div>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center">
        <p>{data.description}</p>
      </div>
    </div>
  );
}
