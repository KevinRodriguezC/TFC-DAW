import type {
  MetaFunction,
  LoaderFunctionArgs,
  ActionFunctionArgs,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { getSession, commitSession } from "../sessions";
import { getUserByUsername } from "~/model/user";
import { useTranslation } from "react-i18next";
import { cardInfo } from "~/cardGenerator";

export const meta: MetaFunction = () => {
  return cardInfo("Log in | TFC App", "Log in page");
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
  // Get the error message if there is an error message
  const session = await getSession(request.headers.get("Cookie"));
  const data = { error: session.get("error") };

  // Save the error on a cookie
  return json(data, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export async function action({ request }: ActionFunctionArgs) {
  // Get the cookie session
  const session = await getSession(request.headers.get("Cookie"));

  // Get POST request data
  const form = await request.formData();
  const username = form.get("email");
  const password = form.get("password");

  // Validate the user
  const user = await validateCredentials(username, password);

  // If the username and password aren't valid
  if (user == null) {
    session.flash("error", "Invalid username/password");

    return redirect("/login", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  // Set the user session cookie
  session.set("userId", "" + user.id);

  // Redirect to the homepage
  return redirect("/w", {
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
        <Form
          className="container-primary-bg container-secondary-border border-2 rounded-md p-4 flex flex-col gap-4 min-w-96"
          method="POST"
        >
          <h1 className="text-3xl font-bold">{t("log_in")}</h1>
          <label htmlFor="email">{t("username")}</label>
          <input type="text" className="form-control" name="email" required />
          <label htmlFor="email">{t("password")}</label>
          <input
            type="password"
            className="form-control"
            name="password"
            required
          />
          <p>
            {t("dont_have_an_account")},{" "}
            <Link
              to="/signup"
              className="text-blue-800 dark:text-blue-300 underline"
            >
              {t("create_an_account")}
            </Link>
            .
          </p>
          {error && (
            <div className="bg-red-200 dark:bg-red-800 text-red-900 dark:text-red-200 rounded-md p-2">
              {error}
            </div>
          )}
          <input type="submit" value={t("log_in")} className="btn-primary" />
        </Form>
      </div>
    </div>
  );
}
