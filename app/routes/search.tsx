import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { UserCardInfo } from "~/components/userCardInfo";

import { searchUsers } from "~/model/search";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("inputQuery");
  const usersSearch = await searchUsers(q);
  return json({ usersSearch, q });
};

export default function Index() {
  let { usersSearch, q } = useLoaderData<typeof loader>();

  return (
    <div className="flex-1 flex flex-col container-primary-bg min-h-screen dark:text-white">
      <div className="container-secondary-bg border-b-2 container-secondary-border p-2 flex gap-2 justify-between">
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
      <div className="xl:mx-auto xl:w-[1020px] flex flex-col gap-4 m-4 flex-1">
        <h2 className="text-xl">Searchs for the term "{q}"</h2>
        {usersSearch.length ? (
          usersSearch.map((userSearch: any) => (
            <UserCardInfo
              name={userSearch.name + " " + userSearch.lastname}
              username={userSearch.username}
            />
          ))
        ) : (
          <p>No results</p>
        )}
      </div>
    </div>
  );
}
