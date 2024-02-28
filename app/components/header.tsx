import { Link } from "@remix-run/react";

export default function Header({username}: {username: any}) {
  return (
    <div className="container-secondary-bg border-b-2 container-secondary-border p-2 flex gap-2 justify-between">
      <h1 className="text-2xl font-bold self-center">
        <Link to="/">TFC</Link>
      </h1>
      <div className="flex gap-2">
        <div className="flex gap-2">
          <form action="/search" method="get" className="flex gap-2">
            <input className="form-control h-10" name="inputQuery" />
            <input type="submit" value="Search" className="btn-primary h-10" />
          </form>
          <div className="bg-slate-300 dark:bg-slate-900 w-[2px]"></div>
          {username ? (
            <>
              <Link to="/app" className="btn-primary h-10">
                Workspace
              </Link>
              <button className="bg-purple-600 btn-user-icon">
                {username}
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-primary h-10">
                Login
              </Link>
              <Link to="/signup" className="btn-primary h-10">
                Create an account
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
