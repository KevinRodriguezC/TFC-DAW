import { useEffect } from "react";
import { useUser } from "./hooks/useUser";
import i18next from "./i18n";

export function manageLogin(userInfo: any = null) {
  const { user, login, logout } = useUser();

  useEffect(() => {
    if (userInfo && userInfo.username) {
      login(userInfo);
    } else {
      logout();
    }
    if (userInfo && userInfo.language && typeof userInfo.language == "string") {
      i18next.changeLanguage(userInfo.language);
    } else {
      i18next.changeLanguage("en");
    }
  }, [userInfo]);
}
