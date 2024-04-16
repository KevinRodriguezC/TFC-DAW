import { Link, NavLink } from "@remix-run/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function WorkspaceSidebar({ directories }: { directories: any }) {
  const { t } = useTranslation();

  const [leftBarMenu, setLeftBarMenu] = useState(1);

  const setLeftBarMenuToggle = (newValue: number) => {
    if (leftBarMenu == newValue) {
      setLeftBarMenu(0);
    } else {
      setLeftBarMenu(newValue);
    }
  };

  return (
    <div
      className={
        (leftBarMenu == 1 ? "w-80 " : "") +
        "container-secondary-bg border-r-2 container-secondary-border p-2 flex flex-col gap-2 overflow-y-auto flex-shrink-0"
      }
    >
      <div className="flex gap-2 align-middle">
        {leftBarMenu == 1 ? (
          <div className="flex gap-2 flex-1 self-center">
            <div className="rounded-md p-2 flex bg-slate-200 dark:bg-slate-900 justify-center items-center w-8 h-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-folder-fill"
                viewBox="0 0 16 16"
              >
                <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a2 2 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3m-8.322.12q.322-.119.684-.12h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981z" />
              </svg>
            </div>
            <h3 className="text-md self-center font-bold">
              {t("directories")}
            </h3>
          </div>
        ) : (
          ""
        )}
        <button className="btn-icon" onClick={() => setLeftBarMenuToggle(1)}>
          {leftBarMenu == 1 ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chevron-left"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chevron-right"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
              />
            </svg>
          )}
        </button>
      </div>
      <ul className="flex flex-col gap-2 flex-1">
        {directories.length
          ? directories.map((directory: any) => (
              <li key={directory.id}>
                {leftBarMenu == 1 ? (
                  <NavLink className="navbarItem" to={"" + directory.id}>
                    <div className="p-2 flex gap-2 bg-blue-600 text-white rounded-md self-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-folder-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a2 2 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3m-8.322.12q.322-.119.684-.12h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981z" />
                      </svg>
                    </div>
                    <div className="self-center word-wrap-anywhere">
                      {directory.name}
                    </div>
                  </NavLink>
                ) : (
                  <NavLink className="navbarItemSmall" to={"" + directory.id}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-folder-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a2 2 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3m-8.322.12q.322-.119.684-.12h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981z" />
                    </svg>
                  </NavLink>
                )}
              </li>
            ))
          : leftBarMenu
          ? t("no_directories")
          : ""}
      </ul>
      <Link
        to="new"
        className={
          (leftBarMenu == 0 ? "btn-primary-small-square " : "btn-primary ") +
          "flex gap-2 flex-shrink-0"
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-plus-lg"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
          />
        </svg>
        {leftBarMenu == 1 ? t("new_directory") : ""}
      </Link>
    </div>
  );
}
