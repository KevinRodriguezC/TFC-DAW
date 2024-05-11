import { useUser } from "./hooks/useUser";

export function manageLogin(userInfo: any) {
  const { login, logout } = useUser();

  const checkLogin = async () =>
    userInfo && userInfo.username ? login(userInfo) : logout();

  checkLogin();
}
