import i18next from "./i18n";

export const setLanguage = (language: string) => {
  i18next.changeLanguage(language);
};

export const loadLanguage = (session: any) => {
  const actualLanguage = session.get("language");
  console.log(actualLanguage);
  if (actualLanguage) {
    i18next.changeLanguage(actualLanguage);
    return actualLanguage;
  } else {
    i18next.changeLanguage("en");
    return "es";
  }
};

export const manageClientLanguage = (userInfo: any) => {
  if (userInfo && userInfo.language && typeof userInfo.language == "string") {
    i18next.changeLanguage(userInfo.language);
  } else {
    i18next.changeLanguage("en");
  }
};
