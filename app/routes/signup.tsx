import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { createUser, getUserByEmail, getUserByUsername } from "~/model/user";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { MainContainer } from "~/components/mainContainer";
import { commitSession, getSession } from "~/sessions";
import { cardInfo } from "~/cardGenerator";
import { manageLogin } from "~/manageLogin";

export const meta: MetaFunction = () => {
  const { t } = useTranslation();

  return cardInfo(t("signup") + " || TFC app", t("signup"));
};

export async function loader({ request }: LoaderFunctionArgs) {
  // Get the user session cookie
  const session = await getSession(request.headers.get("Cookie"));

  // Get the form errors
  const data = { error: session.get("error") };

  return json(data, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  try {
    // Get the POST request parameters
    const formData = await request.formData();
    let email = formData.get("email");
    let username = formData.get("username");
    let name = formData.get("name");
    let lastname = formData.get("lastname");
    let password = formData.get("password");

    // Check if all parameters are valid
    if (
      !email ||
      !username ||
      !name ||
      !lastname ||
      !password ||
      typeof email != "string" ||
      typeof username != "string" ||
      typeof name != "string" ||
      typeof lastname != "string" ||
      typeof password != "string"
    ) {
      session.flash("error", "Missing parameters");

      return redirect("/signup", {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    }

    //Check if the username is already taken
    const userUsername = await getUserByUsername(username);
    if (userUsername) {
      session.flash("error", "The username " + username + " is taken");

      return redirect("/signup", {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    }

    // Check if the email is already in use
    const userEmail = await getUserByEmail(email);
    console.log(userEmail);
    if (userEmail) {
      session.flash("error", "Email already in use");

      return redirect("/signup", {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    }

    // Create the user account
    const user = await createUser(email, username, name, lastname, password);
    session.set("userId", "" + user.id);

    return redirect("/w", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } catch (error) {
    // Print the error
    console.log(error);

    // Send the error
    session.flash("error", "Internal server error");

    return redirect("/signup", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }
}

export default function Index() {
  const { error } = useLoaderData<typeof loader>();

  const { t } = useTranslation();

  manageLogin();

  return (
    <MainContainer>
      <div className="flex flex-1 flex-col dark:text-white container-secondary-bg justify-center items-center">
        <Form
          method="post"
          className="container-primary-bg container-secondary-border border-2 rounded-md p-4 flex flex-col gap-2 min-w-96"
        >
          <h1 className="text-3xl font-bold">{t("create_an_account")}</h1>
          <label htmlFor="email">{t("email")}</label>
          <input type="text" className="form-control" name="email" />
          <label htmlFor="username">{t("username")}</label>
          <input type="text" className="form-control" name="username" />
          <label htmlFor="name">{t("name")}</label>
          <input type="text" className="form-control" name="name" />
          <label htmlFor="lastname">{t("lastname")}</label>
          <input type="text" className="form-control" name="lastname" />
          <label htmlFor="password">{t("password")}</label>
          <input type="password" className="form-control" name="password" />
          <p>
            {t("already_have_an_account")},{" "}
            <Link
              to="/login"
              className="  text-blue-800 dark:text-blue-300 underline"
            >
              {t("log_in")}
            </Link>
            .
          </p>
          {error && (
            <div className="bg-red-200 dark:bg-red-800 text-red-900 dark:text-red-200 rounded-md p-2">
              {error}
            </div>
          )}
          <input
            type="submit"
            value={t("create_an_account")}
            className="btn-primary"
          />
        </Form>
      </div>
    </MainContainer>
  );
}
