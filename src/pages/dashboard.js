import React, { useEffect } from "react";
import CheckLogin from "../CheckLogin.js";
import "./styles/dashboard.css";
import SeasonCards from "../components/dashboard/SeasonCards.js";
import Drawer from "../components/Template";
import { useDispatch } from "react-redux";
import getSeasonList from "../requests/getSeasonList.js";
import { w3cwebsocket as W3CWebSocket } from "websocket";

export default function Dashboard() {
  // useEffect(() => {
  //   const client = new W3CWebSocket("ws://127.0.0.1:8000/anchor/");
  //   client.onopen = () => {
  //     console.log("WebSocket Client Connected");
  //   };
  //   client.onclose = () => {
  //     console.log("connection Closed");
  //   };
  //   // client.send(JSON.stringify({ msg: "hiii" }));
  //   client.onmessage = (message) => {
  //     const dataFromServer = JSON.parse(message.data);
  //     if (dataFromServer) {
  //       console.log("data");
  //     }
  //   };
  // }, []);
  const dispatch = useDispatch();
  useEffect(() => {
    CheckLogin(dispatch);
    const request = getSeasonList();
    request(dispatch);
  }, [dispatch]);

  return <Drawer content={<SeasonCards />} />;
}
