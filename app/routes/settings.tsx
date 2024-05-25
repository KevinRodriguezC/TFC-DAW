import type {
  MetaFunction,
  LoaderFunctionArgs,
  ActionFunctionArgs,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { commitSession, getSession } from "../sessions";
import { Header } from "../components/header";
import { Toogle } from "~/components/toggle";
import { getUserInfo, updateUser } from "~/model/user";
import { MainContainer } from "~/components/mainContainer";
import { useTranslation } from "react-i18next";
import i18n from "./../i18n";
import { UserProfilePicture } from "~/components/userProfilePicture";
import { manageLogin } from "~/manageLogin";
import { colorsArray } from "~/profilePictureColors";
import { getUserByUsername } from "~/model/user";
import { getUserSession } from "~/getUserSession";
import { cardInfo } from "~/cardGenerator";
import { loadLanguage, setLanguage, manageClientLanguage } from "~/setLanguage";

const lngs = {
  en: { nativeName: "English", value: "en" },
  es: { nativeName: "Español", value: "es" },
};

export const meta: MetaFunction = () => {
  const { t } = useTranslation();

  return cardInfo(t("settings") + " | TFC App", t("settings"));
};

export async function action({ params, request }: ActionFunctionArgs) {
  // Get the user information and the user id
  const { userId, userInfo } = await getUserSession(
    await getSession(request.headers.get("Cookie"))
  );

  // const cookie = request.headers.get("Cookie");
  // console.log(cookie);

  // Get the POST request parameters
  const formData = await request.formData();
  const username = formData.get("username");
  const name = formData.get("name");
  const lastname = formData.get("lastname") || ""; // Set the lastname to "" if there isn't a lastname
  const profilePictureColor = formData.get("profilePictureColor");
  const visibilityString = formData.get("visibility");
  const language = formData.get("language");

  // Changet the visibility format
  const visibility = visibilityString == "on" ? 1 : 0;

  // Check if the username is already taken
  if (username != userInfo.username) {
    const getUser = await getUserByUsername(username);
    if (!username || getUser) {
      throw new Response("Username not valid", { status: 400 });
    }
  }

  // Check if all the form parameters exist
  if (
    !userId ||
    !+userId ||
    !username ||
    !name ||
    !language ||
    typeof name != "string" ||
    typeof lastname != "string" ||
    typeof username != "string" ||
    typeof language != "string" ||
    !profilePictureColor ||
    !+profilePictureColor
  ) {
    throw new Response("Missing parameters", { status: 400 });
  }

  // Change the userId variable type
  const userIdNumber = +userId;

  // setLanguage(language, await getSession(request.headers.get("Cookie")));
  // session.set("language", language);

  // Update the user
  updateUser(
    userIdNumber,
    username,
    name,
    lastname,
    visibility,
    +profilePictureColor,
    language
  );

  return redirect("/settings");
}

export async function loader({ request }: LoaderFunctionArgs) {
  // Get the user information and the user id
  const { userId } = await getUserSession(
    await getSession(request.headers.get("Cookie"))
  );

  // Load the language from the user session
  // const language = loadLanguage(
  //   await getSession(request.headers.get("Cookie"))
  // );

  // Get all the user information
  const userInfo = await getUserInfo(+userId);
  if (!userInfo) {
    throw new Response("Error");
  }

  // Generate a custom array for the client
  let userArray = {
    username: userInfo.username,
    name: userInfo.name,
    lastname: userInfo.lastname || "",
    visibility: userInfo.visibility != 0,
    profilePictureColor: userInfo.profilePictureColor,
    language: userInfo.language,
  };

  return json(
    { userArray }
    // {
    //   headers: {
    //     "Set-Cookie": await commitSession(session),
    //   },
    // }
  );
}

export default function Settings() {
  const { userArray } = useLoaderData<typeof loader>();

  const { t } = useTranslation();

  manageLogin(userArray);

  return (
    <MainContainer>
      <Header />
      <div className="xl:mx-auto xl:w-[1020px] flex flex-col gap-4 m-4 flex-1">
        <Form method="post" className="flex flex-col gap-2 p-2">
          <h2 className="text-2xl">{t("account_settings")}</h2>
          <label htmlFor="name">{t("username")}</label>
          <input
            type="text"
            name="username"
            className="form-control"
            defaultValue={userArray.username}
            required
          />
          <label htmlFor="name">{t("name")}</label>
          <input
            type="text"
            name="name"
            className="form-control"
            defaultValue={userArray.name}
            required
          />
          <label htmlFor="lastname">{t("lastname")}</label>
          <input
            type="text"
            name="lastname"
            className="form-control"
            defaultValue={userArray.lastname}
          />
          <label>{t("visibility")}</label>
          <label
            htmlFor="visibility"
            className="flex p-2 bg-slate-100 dark:bg-slate-800 rounded-md items-center cursor-pointer select-none"
          >
            <p className="flex-1">{t("public_profile")}</p>
            <Toogle
              inputName="visibility"
              defaultValue={userArray.visibility}
            ></Toogle>
          </label>
          <label>{t("language")}</label>
          {JSON.stringify(userArray.language)}
          <select
            name="language"
            className="flex p-2 bg-slate-100 dark:bg-slate-800 rounded-md items-center cursor-pointer select-none"
            defaultValue={userArray.language}
          >
            {Object.keys(lngs).map((lng: any) => (
              <option key={lng} value={lng}>
                {lng}
              </option>
            ))}
          </select>
          <label>{t("profile_picture_color")}</label>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
            {colorsArray.map((colorInfo) => (
              <div className="select-none" key={colorInfo.id}>
                <input
                  type="radio"
                  name="profilePictureColor"
                  className="profilePictureColor"
                  id={"color-" + colorInfo.id}
                  value={colorInfo.id}
                  hidden
                  defaultChecked={userArray.profilePictureColor == colorInfo.id}
                />
                <label
                  htmlFor={"color-" + colorInfo.id}
                  className="profilePictureSelector"
                >
                  <UserProfilePicture
                    user={{
                      username: userArray.username,
                      profilePictureColor: colorInfo.id,
                    }}
                    size={"size-11 text-lg"}
                  />
                  {t(colorInfo.name)}
                </label>
              </div>
            ))}
          </div>
          <input className="btn-primary" type="submit" value={t("save")} />
        </Form>
      </div>
    </MainContainer>
  );
}
