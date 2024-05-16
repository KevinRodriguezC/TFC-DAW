import { Form, Link } from "@remix-run/react";
import { UserDropdown } from "./userDropdown";
import { useTranslation } from "react-i18next";
import { useUser } from "~/hooks/useUser";

export function HomepageHeader() {
  const { t } = useTranslation();

  const { user } = useUser();

  return (
    <header className="bg-slate-200/60 dark:bg-slate-800/60 border-b-2 container-secondary-border p-4 sticky top-0 backdrop-blur-sm">
      <div className="flex gap-4 justify-between max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold self-center flex-1">
          <Link to="/">TFC</Link>
        </h1>
        {/* <div className="flex gap-2"> */}
        <Form action="/search" method="get" className="flex gap-2">
          <input
            className="form-control h-10 sm:w-96"
            name="inputQuery"
            placeholder={t("search")}
          />
          {/* <input
              type="submit"
              value={t("search")}
              className="btn-primary h-10"
            /> */}
        </Form>
        <div className="bg-slate-300 dark:bg-slate-900 w-[2px] xl:hidden"></div>
        <div className="flex gap-4 justify-end xl:flex-1">
          {user ? (
            <UserDropdown />
          ) : (
            <>
              <Link to="/login" className="btn-secondary h-10">
                {t("login")}
              </Link>
              <Link to="/signup" className="btn-primary h-10">
                {t("create_an_account")}
              </Link>
            </>
          )}
        </div>
      </div>
      {/* </div> */}
    </header>
  );
}
