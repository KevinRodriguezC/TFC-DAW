import { Form, Link } from "@remix-run/react";
import { UserDropdown } from "./userDropdown";
import { useTranslation } from "react-i18next";

export default function Header({
  username,
  name,
}: {
  username: string | null;
  name: string | null;
}) {
  const { t } = useTranslation();

  return (
    <div className="container-secondary-bg border-b-2 container-secondary-border p-2 flex gap-2 justify-between">
      <h1 className="text-2xl font-bold self-center">
        <Link to="/">TFC</Link>
      </h1>
      <div className="flex gap-2">
        <div className="flex gap-2">
          <Form action="/search" method="get" className="flex gap-2">
            <input className="form-control h-10" name="inputQuery" />
            <input
              type="submit"
              value={t("search")}
              className="btn-primary h-10"
            />
          </Form>
          <div className="bg-slate-300 dark:bg-slate-900 w-[2px]"></div>
          {username && name ? (
            <UserDropdown username={username} name={name} />
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
    </div>
  );
}
