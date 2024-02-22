import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { searchUsersByName } from "~/model/user";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("inputQuery");
  // const usersSearch = await searchUsersByName(q);
  const usersSearch = [
    {'id':1},
    {'id':2},
    {'id':3},
    {'id':4}
  ]
  return json({ usersSearch, q });
};

export default function Index() {
  const { usersSearch, q } = useLoaderData<typeof loader>();


  return (
    <div className="flex-1 flex flex-col">
      <div className="bg-slate-200 border-b-2 border-slate-300 flex-1 p-2 flex gap-2 justify-between">
        <h1 className="text-2xl font-bold self-center">
          <Link to="/app">TFC</Link>
        </h1>
        <div className="flex gap-2">
          <div className="flex gap-2">
            <form action="/search" method="get" className="flex gap-2">
              <input className="form-control h-10" name="inputQuery" defaultValue={q || ""}/>
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
      <div className="flex flex-1 flex-col items-center justify-center">
        Searchs for the term { q }
        {usersSearch.length ?  (
          <div>
            {usersSearch.map((userInfo: any) => {
              {userInfo.id}
            })}
          </div>
        ) : (
          <p>
            No results
          </p>
        )}
      </div>
    </div>
  );
}
