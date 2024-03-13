import { Menu } from "@headlessui/react";
import { Link } from "@remix-run/react";
import { useTranslation } from "react-i18next";

export function UserDropdown({
  username,
  name,
}: {
  username: string;
  name: string;
}) {
  const { t } = useTranslation();

  return (
    <Menu>
      <Menu.Button className="btn-user-icon bg-purple-600">
        {username.charAt(0)}
      </Menu.Button>
      <Menu.Items className="absolute top-16 right-1 p-2 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-900 border-2 rounded-2xl flex flex-col gap-2 min-w-72">
        <div className="flex gap-2">
          <div className="btn-user-icon bg-purple-600 gap-2">
            {username.charAt(0)}
          </div>
          <div className="flex flex-col">
            <h2 className="text-xl font-bold">{name}</h2>
            <h4>@{username}</h4>
          </div>
        </div>
        <Menu.Item>
          {({ active }) => (
            <Link className="btn-header-secondary" to="/app">
              {t("workspaces")}
            </Link>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <Link className="btn-header-secondary" to="/">
              {t("home")}
            </Link>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <Link className="btn-header-secondary" to="/settings">
              {t("manage_account")}
            </Link>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <Link className="btn-header-secondary" to="/u">
              {t("view_profile")}
            </Link>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <Link className="btn-danger" to="/logout">
              {t("logout")}
            </Link>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}
