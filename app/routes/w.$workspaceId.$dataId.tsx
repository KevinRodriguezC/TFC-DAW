import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";

import { useLoaderData } from "@remix-run/react";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

async function getDirectoryInfo(id: number) {
  const result = await prisma.directory.findFirst({
    where: {
      id: {
        equals: id,
      },
    },
  });
  return result;
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const directoryId = params.dataId;
  if (!directoryId) {
    throw new Error("Error");
  }
  const data = await getDirectoryInfo(+directoryId);
  if (!data) {
    throw new Error("Error");
  }
  return json({ data });
};

export default function Index() {
  const {data} = useLoaderData<typeof loader>();

  return (
    <div className="container-primary-bg flex-1 flex flex-col">
      <div className="p-2 border-b-2 container-primary-border">{data.createdAt}</div>
      <div className="flex flex-1 flex-col items-center justify-center">
        <p>Data info</p>
      </div>
    </div>
  );
}
