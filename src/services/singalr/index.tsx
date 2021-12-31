import { io } from "socket.io-client";
import React, { useEffect } from "react";
var SOCKET_URL = "http://localhost:5001/";

export const SignalR = () => {
  useEffect(() => {
    const socket = io(SOCKET_URL);
    socket.emit("initial_data", handleInit);
  }, []);

  const handleChangeData = () => {
    console.log("handleChangeData");
  };

  const handleInit = () => {
    console.log("handleInit");
  };

  const handleGetData = () => {
    console.log("handleGetData");
  };

  return <div></div>;
};
