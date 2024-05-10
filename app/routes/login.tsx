import type {
  MetaFunction,
  LoaderFunctionArgs,
  ActionFunctionArgs,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { getSession, commitSession } from "../sessions";

import { getUserByUsername } from "~/model/user";
import { useTranslation } from "react-i18next";
import { useUser } from "~/hooks/useUser";

export const meta: MetaFunction = () => {
  return [
    { title: "Log in | TFC App" },
    { name: "description", content: "Log in page" },
  ];
};

async function validateCredentials(username: any, password: any) {
  let user = await getUserByUsername(username);
  if (user && password == user.password) {
    return user;
  } else {
    return null;
  }
}

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  // if (session.has("userId")) {
  //   return redirect("/");
  // }

  const data = { error: session.get("error") };

  return json(data, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const form = await request.formData();
  const username = form.get("email");
  const password = form.get("password");

  const user = await validateCredentials(username, password);

  if (user == null) {
    session.flash("error", "Invalid username/password");

    return redirect("/login", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  session.set("userId", "" + user.id);

  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function Login() {
  const { error } = useLoaderData<typeof loader>();

  const { t } = useTranslation();

  return (
    <div className="flex flex-col dark:text-white min-h-screen bg-slate-200">
      <div className="flex flex-col dark:text-white flex-1 container-secondary-bg justify-center items-center">
        <form
          className="container-primary-bg container-secondary-border border-2 rounded-md p-4 flex flex-col gap-4 min-w-96"
          method="POST"
        >
          <h1 className="text-3xl font-bold">{t("log_in")}</h1>
          <label htmlFor="email">{t("username")}</label>
          <input type="text" className="form-control" name="email" />
          <label htmlFor="email">{t("password")}</label>
          <input type="password" className="form-control" name="password" />
          <p>
            {t("dont_have_an_account")},{" "}
            <Link to="/signup" className="  text-blue-800 underline">
              {t("create_an_account")}
            </Link>
            .
          </p>
          <input type="submit" value={t("log_in")} className="btn-primary" />
        </form>
      </div>
    </div>
  );
}
