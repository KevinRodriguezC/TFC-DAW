import type {
  MetaFunction,
  LoaderFunctionArgs,
  ActionFunctionArgs,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { getSession } from "../sessions";
import { Header } from "../components/header";
import { Toogle } from "~/components/toggle";
import { getUserInfo, updateUser } from "~/model/user";
import { MainContainer } from "~/components/mainContainer";
import { useTranslation } from "react-i18next";
import i18n from "./../i18n";

const lngs = {
  en: { nativeName: "English" },
  es: { nativeName: "Español" },
};

export const meta: MetaFunction = () => {
  const { t } = useTranslation();

  return [
    { title: t("settings") + " | TFC App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function action({ params, request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  let userId = session.get("userId");
  const formData = await request.formData();
  let name = formData.get("name");
  let lastname = formData.get("lastname");
  let profilePictureColor = formData.get("profilePictureColor");

  let visibilityString = formData.get("visibility");
  let visibility;
  if (visibilityString == "on") {
    visibility = 1;
  } else {
    visibility = 0;
  }

  if (!lastname) {
    lastname = "";
  }

  if (!profilePictureColor || !+profilePictureColor) {
    return new Response("Missing parameters", { status: 400 });
  }

  if (
    !userId ||
    !+userId ||
    !name ||
    typeof name != "string" ||
    typeof lastname != "string"
  ) {
    throw new Response("Error", { status: 500 });
  }
  let userIdNumber = +userId;
  updateUser(userIdNumber, name, lastname, visibility, +profilePictureColor);
  return redirect("/settings");
}

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  let userId = session.get("userId");
  if (!userId || !+userId) {
    throw new Response("Error");
  }
  let userArray = await getUserInfo(+userId);
  if (!userArray) {
    throw new Response("Error");
  }
  let userInfo = {
    username: userArray.username,
    name: userArray.name,
    lastname: userArray.lastname ? userArray.lastname : "",
    visibility: userArray.visibility != 0,
  };
  return json({ userInfo });
}

export default function Settings() {
  const { userInfo } = useLoaderData<typeof loader>();

  const { t } = useTranslation();

  let colors = [
    { id: 1, name: "color_blue", value: "bg-blue-600" },
    { id: 2, name: "color_red", value: "bg-red-600" },
    { id: 3, name: "color_purple", value: "bg-purple-600" },
  ];

  return (
    <MainContainer>
      <Header />
      <div className="xl:mx-auto xl:w-[1020px] flex flex-col gap-4 m-4 flex-1">
        <Form method="post" className="flex flex-col gap-2 p-2">
          <h2 className="text-2xl">{t("account_settings")}</h2>
          <label htmlFor="name">{t("name")}</label>
          <input
            type="text"
            name="name"
            className="form-control"
            defaultValue={userInfo.name}
            required
          />
          <label htmlFor="lastname">{t("lastname")}</label>
          <input
            type="text"
            name="lastname"
            className="form-control"
            defaultValue={userInfo.lastname}
          />
          <label>{t("visibility")}</label>
          <div className="flex p-2 bg-slate-100 dark:bg-slate-800 rounded-md items-center pointer">
            <label className="flex-1" htmlFor="visibility">
              {t("public_profile")}
            </label>
            <Toogle
              inputName="visibility"
              defaultValue={userInfo.visibility}
            ></Toogle>
          </div>
          <label>{t("language")}</label>
          <div className="flex gap-2">
            {Object.keys(lngs).map((lng) => (
              <button
                type="button"
                className="btn-primary"
                key={lng}
                onClick={() => {
                  i18n.changeLanguage(lng);
                }}
              >
                {lngs[lng].nativeName}
              </button>
            ))}
          </div>
          {colors.map((colorInfo) => (
            <>
              <input
                type="radio"
                name="profilePictureColor"
                id={"color-" + colorInfo.id}
                value={colorInfo.id}
              />
              <label htmlFor={"color-" + colorInfo.id}>
                {t(colorInfo.name)}
              </label>
            </>
          ))}
          <input className="btn-primary" type="submit" value="Save changes" />
        </Form>
      </div>
    </MainContainer>
  );
}
