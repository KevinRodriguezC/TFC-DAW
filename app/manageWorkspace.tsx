import { useUser } from "./hooks/useUser";
import { useWorkspace } from "./hooks/useWorkspace";

export function manageWorkspace(workspace: any) {
  const { setWorkspace } = useWorkspace();

  const checkWorkspace = async () => workspace && setWorkspace(workspace);

  checkWorkspace();
}
