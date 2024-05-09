import { Link } from "@remix-run/react";
import { UserProfilePicture } from "./userProfilePicture";

export function UserCardInfo({ user }: { user: any }) {
  return (
    <Link
      to={"/u/" + user.username}
      className="bg-slate-100 dark:bg-slate-800 p-2 flex gap-2 rounded-full items-center hover:bg-slate-200 dark:hover:bg-slate-900 active:bg-slate-300 dark:active:bg-slate-950"
    >
      <UserProfilePicture user={user} size={"size-10"} />
      <h2 className="text-xl font-bold">{user.name}</h2>
      <h3>@{user.username}</h3>
    </Link>
  );
}
