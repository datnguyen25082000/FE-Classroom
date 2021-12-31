import React, { useEffect } from "react";
import { Routers } from "./routers";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { useAppDispatch, doGetCurrentUser } from "./redux";
import { SignalR } from "./services/singalr";

export default function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(doGetCurrentUser());
  }, []);

  return (
    <div className="app">
      <Routers />
      {/* <SignalR /> */}
    </div>
  );
}
