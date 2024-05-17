import { createContext, useState } from "react";

export const WorkspaceContext = createContext([]);

export function WorkspaceProvider({ children }) {
  const [workspace, setWorkspace] = useState(null);
  const [users, setUsers] = useState(null);

  return (
    <WorkspaceContext.Provider value={{ workspace, setWorkspace, users }}>
      {children}
    </WorkspaceContext.Provider>
  );
}
