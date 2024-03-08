import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";

import {
  Link,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";

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
  return (
    <div className="flex-1 p-4 flex flex-col gap-4 items-center justify-center bg-red-100 text-red-950">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="128"
        height="128"
        fill="currentColor"
        className="bi bi-exclamation-triangle-fill"
        viewBox="0 0 16 16"
      >
        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
      </svg>
      <h1 className=" text-5xl font-bold">
        {isRouteErrorResponse(error) ? error.status : "Unknown error"}
      </h1>
      <p>Something went wrong</p>
    </div>
  );
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
