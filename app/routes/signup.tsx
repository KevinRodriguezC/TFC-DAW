import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

import Header from "../components/header";

import { createUser } from "~/model/user";
import { Link } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { MainContainer } from "~/components/mainContainer";

export const meta: MetaFunction = () => {
  const { t } = useTranslation();

  return [
    { title: "App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  let email = formData.get("email");
  let username = formData.get("username");
  let name = formData.get("name");
  let lastname = formData.get("lastname");
  let password = formData.get("password");
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
    throw new Response("Error", { status: 400 });
  }
  const user = createUser(email, username, name, lastname, password);
  return json({});
}

export default function Index() {
  const { t } = useTranslation();

  return (
    <MainContainer>
      <div className="flex flex-1 flex-col dark:text-white container-secondary-bg justify-center items-center">
        <form
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
            <Link to="/login" className="  text-blue-800 underline">
              {t("log_in")}
            </Link>
            .
          </p>
          <input
            type="submit"
            value={t("create_an_account")}
            className="btn-primary"
          />
        </form>
      </div>
    </MainContainer>
  );
}
