import type { MetaFunction } from "@remix-run/node";
import { Outlet, Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="flex-1 flex flex-col">
      <div className="bg-slate-200 border-b-2 border-slate-300 flex-1 p-2 flex gap-2 justify-between">
        <h1 className="text-2xl font-bold self-center">
          <Link to="/app">TFC</Link>
        </h1>
        <div className="flex gap-2">
          <div className="flex gap-2">
            <form action="/search" method="get" className="flex gap-2">
              <input className="form-control h-10" name="inputQuery" />
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
        <p>Select a workspace</p>
        <Link to="/w/1">1</Link>
      </div>
    </div>
  );
}
