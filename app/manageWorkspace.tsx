import { useEffect } from "react";
import { useUser } from "./hooks/useUser";
import { useWorkspace } from "./hooks/useWorkspace";

export function manageWorkspace(workspace: any) {
  const { setWorkspace } = useWorkspace();

  useEffect(() => {
    if (workspace) {
      setWorkspace(workspace);
    }
  }, []);
}
