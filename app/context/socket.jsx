import { createContext, useState } from "react";
import socketIOClient from "socket.io-client";

export const SocketContext = createContext([]);

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const configureSocket = async () => {
    await setSocket(await socketIOClient("ws://localhost:8080"));
  };

  return (
    <SocketContext.Provider value={{ socket, configureSocket }}>
      {children}
    </SocketContext.Provider>
  );
}
