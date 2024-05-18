import { useContext } from "react";
import { SocketContext } from "../context/socket";

export const useSocket = () => {
  const context = useContext<any>(SocketContext);

  if (context == undefined) {
    throw new Error("useSocket must be used within a UserContext");
  }

  return context;
};
