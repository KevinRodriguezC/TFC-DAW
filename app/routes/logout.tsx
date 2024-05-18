import type { MetaFunction, ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";

import { getSession, destroySession } from "../sessions";
import { useUser } from "../hooks/useUser";
import { useTranslation } from "react-i18next";
import { cardInfo } from "~/cardGenerator";

export const meta: MetaFunction = () => {
  return cardInfo("App", "Welcome to Remix!");
};

export const action = async ({ request }: ActionFunctionArgs) => {
  // Get the user cookie session
  const session = await getSession(request.headers.get("Cookie"));

  // Destroy the cookie session
  return redirect("/login", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};

export default function LogoutRoute() {
  const { logout } = useUser();

  const { t } = useTranslation();

  return (
    <>
      <div className="flex flex-col dark:text-white min-h-screen">
        <div className="flex flex-1 flex-col dark:text-white container-secondary-bg justify-center items-center">
          <Form
            method="post"
            className="container-primary-bg container-secondary-border border-2 rounded-md p-4 flex flex-col gap-4 min-w-96"
          >
            <h2 className="">{t("are_you_sure_you_want_to_log_out")}</h2>
            <div className="flex gap-2 justify-end">
              <Link to="/" className="btn-secondary">
                {t("no_go_back")}
              </Link>
              <button className="btn-primary" onClick={logout}>
                {t("logout")}
              </button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
