import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

async function searchUsersByName(q: any) {
  const result = await prisma.user.findMany({
    where: {
      username: {
        contains: q
      }
    }
  })
  console.log(result)
  return result;
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("inputQuery");
  const usersSearch = await searchUsersByName(q);
  // const usersSearch = [
  //   { id: 1, username: "one", name: "Name", lastname: "Lastname" },
  //   { id: 2, username: "two", name: "Name", lastname: "Lastname" },
  //   { id: 3, username: "three", name: "Name", lastname: "Lastname" },
  //   { id: 4, username: "four", name: "Name", lastname: "Lastname" },
  // ];
  return json({ usersSearch, q });
};

export default function Index() {
  let { usersSearch, q } = useLoaderData<typeof loader>();

  return (
    <div className="flex-1 flex flex-col">
      <div className="bg-slate-200 border-b-2 border-slate-300 flex-1 p-2 flex gap-2 justify-between">
        <h1 className="text-2xl font-bold self-center">
          <Link to="/app">TFC</Link>
        </h1>
        <div className="flex gap-2">
          <div className="flex gap-2">
            <form action="/search" method="get" className="flex gap-2">
              <input
                className="form-control h-10"
                name="inputQuery"
                defaultValue={q || ""}
              />
              <input
                type="submit"
                value="Search"
                className="btn-primary h-10"
              />
            </form>
            <div className="bg-slate-300 dark:bg-slate-900 w-[2px]"></div>
            <Link to="/app" className="btn-primary h-10">
              Workspace
            </Link>
            <button className="bg-purple-600 btn-user-icon">A</button>
          </div>
        </div>
      </div>
      <div className="xl:mx-auto xl:max-w-[1020px] flex flex-col gap-4 m-4">
        Searchs for the term {q} {typeof usersSearch}
        {usersSearch.length ? (
          usersSearch.map((userSearch: any) => (
            <a
              href={"/u/" + userSearch.username}
              className="bg-slate-100 py-2 px-4 flex flex-col gap-2 rounded-lg hover:bg-slate-200 active:bg-slate-300"
            >
              <h2 className="text-xl font-bold">{userSearch.name}</h2>
              <h3>@{userSearch.username}</h3>
            </a>
          ))
        ) : (
          <p>No results</p>
        )}
      </div>
    </div>
  );
}
