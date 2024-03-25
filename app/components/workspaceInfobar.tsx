import { Link, NavLink } from "@remix-run/react";
import { useTranslation } from "react-i18next";

export function WorkspaceInfobar({
  userInfo,
  users,
}: {
  userInfo: any;
  users: any;
}) {
  const { t } = useTranslation();

  return (
    <div className="container-secondary-bg border-l-2 container-secondary-border p-2 w-96 flex flex-col gap-2">
      <div className="flex gap-2 align-middle">
        <div className="rounded-md p-2 flex bg-slate-200 dark:bg-slate-900 justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-people-fill"
            viewBox="0 0 16 16"
          >
            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
          </svg>
        </div>
        <h3 className="text-md self-center font-bold">{t("participants")}</h3>
      </div>
      <div className="flex flex-col gap-2 flex-1">
        {users.length ? (
          users.map((workspaceUser: any) => (
            <NavLink
              to={"u/" + workspaceUser.username}
              className="participantLink"
            >
              <div className="bg-blue-600 rounded-full size-8"></div>
              {workspaceUser.username}
              {workspaceUser.name}
              {userInfo.username == workspaceUser.username ? (
                <div className="bg-blue-600 text-white rounded-full px-3 self-center">
                  {t("you")}
                </div>
              ) : (
                <></>
              )}
            </NavLink>
          ))
        ) : (
          <></>
        )}
      </div>
      <Link to="i" className="btn-primary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-person-fill-gear"
          viewBox="0 0 16 16"
        >
          <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4m9.886-3.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0" />
        </svg>
        {t("manage_invitations")}
      </Link>
    </div>
  );
}
