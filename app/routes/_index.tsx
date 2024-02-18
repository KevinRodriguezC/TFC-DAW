import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <div className="bg-slate-200 border-b-2 border-slate-300 flex-1 p-2 flex gap-2 justify-between">
        <Link to="/app">App</Link>
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
            <Link to="/logout" className="btn-secondary h-10">
              Logout
            </Link>
            <Link to="/signup" className="btn-primary h-10">
              Sign up
            </Link>
            <Link to="/login" className="btn-secondary h-10">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
