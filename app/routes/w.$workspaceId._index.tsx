import type { MetaFunction } from "@remix-run/node";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

async function getWorkspaceDirectories(id: number) {
  const result = await prisma.directory.findFirst({
    where: {
      parent: {
        equals: id,
      },
    },
  });
  return result;
}

export default function Index() {
  return (
    <div className="flex-1 flex flex-col">
      <div className="p-2 border-b-2 border-slate-100 ">Hello world</div>
      <div className="flex flex-1 flex-col items-center justify-center">
        <p>No data selected</p>
      </div>
    </div>
  );
}
