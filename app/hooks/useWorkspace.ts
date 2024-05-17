import { useContext } from "react";
import { WorkspaceContext } from "../context/workspace";

export const useWorkspace = () => {
  const context = useContext<any>(WorkspaceContext);

  if (context == undefined) {
    throw new Error("useWorkspace must be used within a UserContext");
  }

  return context;
};
