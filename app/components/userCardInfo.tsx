import { Link } from "@remix-run/react";

export function UserCardInfo({
  username,
  name,
}: {
  username: any;
  name: string;
}) {
  return (
    <Link
      to={"/u/" + username}
      className="bg-slate-100 dark:bg-slate-800 p-2 flex gap-2 rounded-full items-center hover:bg-slate-200 dark:hover:bg-slate-900 active:bg-slate-300 dark:active:bg-slate-950"
    >
      <div className="bg-blue-600 rounded-full w-10 h-10"></div>
      <h2 className="text-xl font-bold">{name}</h2>
      <h3>@{username}</h3>
    </Link>
  );
}
