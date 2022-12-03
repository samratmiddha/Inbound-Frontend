import React, { useEffect } from "react";
import CheckLogin from "../CheckLogin.js";
import Drawer from "../components/Template";
import AssessmentContent from "../components/panels/AssessmentContent.js";
import { useDispatch } from "react-redux";
import getSeasonList from "../requests/getSeasonList.js";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import getUserList from "../requests/getUserList.js";

export default function Panels() {
  const dispatch = useDispatch();
  useEffect(() => {
    CheckLogin(dispatch);
    const request = getSeasonList();
    request(dispatch);
    const userListRequest = getUserList();
    userListRequest(dispatch);
  }, [dispatch]);
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
  return <Drawer content={<AssessmentContent />} />;
}
