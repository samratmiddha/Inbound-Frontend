import React, { useEffect } from "react";
import CheckLogin from "../CheckLogin.js";
import Drawer from "../components/Template";
import AssessmentContent from "../components/panels/AssessmentContent.js";
import { useDispatch, useSelector } from "react-redux";
import getSeasonList from "../requests/getSeasonList.js";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import getUserList from "../requests/getUserList.js";
import getPanelList from "../requests/getPanelList.js";
import BackendClient from "../BackendClient.js";
import { setRoundData } from "../features/panelModalSlice.js";

export default function Panels() {
  const dispatch = useDispatch();
  const seasonValue = useSelector((state) => state.season.value);
  const student = useSelector((state) => state.panelModal.student);
  const round = useSelector((state) => state.panelModal.round);
  const ws3 = new WebSocket("ws://localhost:8000/panelws/");
  ws3.onopen = (event) => {
    console.log("connected");
  };
  ws3.onclose = (event) => {
    console.log("disconnected");
  };

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
  return <Drawer content={<AssessmentContent ws={ws3} />} />;
}
