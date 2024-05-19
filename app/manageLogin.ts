import { useEffect } from "react";
import { useUser } from "./hooks/useUser";

export function manageLogin(userInfo: any) {
  const { user, login, logout } = useUser();

  useEffect(() => {
    if (userInfo && userInfo.username) {
      login(userInfo);
    } else {
      logout();
    }
  }, [userInfo]);
}
