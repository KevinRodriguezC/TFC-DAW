import { Menu } from "@headlessui/react";
import { Link } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { UserProfilePicture } from "./userProfilePicture";
import { useContext } from "react";
import { UserContext } from "../context/user";
import { colorStringArray } from "../profilePictureColors";

export function UserDropdown() {
  const { t } = useTranslation();

  const { user } = useContext<any>(UserContext);

  return user ? (
    <Menu>
      <Menu.Button
        className={
          "btn-user-icon " + colorStringArray[user.profilePictureColor - 1]
        }
      >
        {user.username && user.username.charAt(0)}
      </Menu.Button>
      <Menu.Items className="absolute bottom-0 left-0 right-0 sm:top-16 sm:right-1 sm:bottom-auto sm:left-auto p-2 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-900 border-2 rounded-t-2xl sm:rounded-2xl flex flex-col gap-2 min-w-72 z-10">
        <div className="flex gap-2">
          {/* <div className="btn-user-icon-infobar bg-purple-600"> */}
          {/* {user.username.charAt(0)} */}
          {/* </div> */}
          <UserProfilePicture user={user} size={"size-11 text-lg"} />
          <div className="flex flex-col">
            <h2 className="text-xl font-bold">{user.name}</h2>
            <h4>@{user.username}</h4>
          </div>
        </div>
        <Menu.Item>
          {({ active }) => (
            <Link className="btn-header-secondary" to="/">
              {t("home")}
            </Link>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <Link className="btn-header-secondary" to="/app">
              {t("workspaces")}
            </Link>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <Link className="btn-header-secondary" to={"/u/" + user.username}>
              {t("view_profile")}
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
            <Link className="btn-danger" to="/logout">
              {t("logout")}
            </Link>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  ) : (
    <div className={"btn-user-icon animate-pulse"}></div>
  );
}
