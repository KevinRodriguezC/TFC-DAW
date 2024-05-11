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
import { UserProfilePicture } from "~/components/userProfilePicture";
import { manageLogin } from "~/manageLogin";
import { colorsArray } from "~/profilePictureColors";

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
    profilePictureColor: userArray.profilePictureColor,
  };
  return json({ userInfo });
}

export default function Settings() {
  const { userInfo } = useLoaderData<typeof loader>();

  const { t } = useTranslation();

  manageLogin(userInfo);

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
          <label>{t("profile_picture_color")}</label>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
            {colorsArray.map((colorInfo) => (
              <>
                <div className="select-none">
                  <input
                    type="radio"
                    name="profilePictureColor"
                    className="profilePictureColor"
                    id={"color-" + colorInfo.id}
                    value={colorInfo.id}
                    hidden
                  />
                  <label
                    htmlFor={"color-" + colorInfo.id}
                    className="profilePictureSelector"
                  >
                    <UserProfilePicture
                      user={{
                        username: userInfo.username,
                        profilePictureColor: colorInfo.id,
                      }}
                      size={"size-11 text-lg"}
                    />
                    {t(colorInfo.name)}
                  </label>
                </div>
              </>
            ))}
          </div>
          <input className="btn-primary" type="submit" value="Save changes" />
        </Form>
      </div>
    </MainContainer>
  );
}
