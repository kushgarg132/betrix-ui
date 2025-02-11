import React, { createContext, useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

export const WebSocketContext = createContext(null);

const WebSocketProvider = ({ children }) => {
  const [stompClient, setStompClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = new SockJS("http://192.168.29.208:8080/poker-game-websocket");
    const client = new Client({
      webSocketFactory: () => socket,
      debug: (str) => console.log(str),
      reconnectDelay: 5000,  // Reconnect every 5 seconds if disconnected
    });

    client.onConnect = () => {
      console.log("Connected to WebSocket server.");
      setIsConnected(true);
    };

    client.onDisconnect = () => {
      console.log("Disconnected from WebSocket server.");
      setIsConnected(false);
    };

    client.activate();
    setStompClient(client);

    return () => {
      client.deactivate();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ stompClient, isConnected }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketProvider;
