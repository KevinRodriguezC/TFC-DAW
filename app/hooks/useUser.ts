import { useContext } from "react";
import { UserContext } from "../context/user";

export const useUser = () => {
  const context = useContext<any>(UserContext);

  if (context == undefined) {
    throw new Error("useUser must be used within a UserContext");
  }

  return context;
};
