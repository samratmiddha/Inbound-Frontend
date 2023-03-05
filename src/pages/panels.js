import React, { useEffect } from "react";
import CheckLogin from "../CheckLogin.js";
import Drawer from "../components/Template";
import PanelsContent from "../components/panels/PanelsContent.js";
import { useDispatch, useSelector } from "react-redux";
import getSeasonList from "../requests/getSeasonList.js";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import getUserList from "../requests/getUserList.js";
import { BACKEND_HOST } from "../constants.js";

export default function Panels() {
  const dispatch = useDispatch();
  // const ws3 = new WebSocket(`${BACKEND_HOST}panelws/`);
  const ws3 = new WebSocket(`ws://localhost:8000/panelws/`);
  ws3.onopen = (event) => {
    // console.log("connected");
  };
  ws3.onclose = (event) => {
    // console.log("disconnected");
  };

  useEffect(() => {
    CheckLogin(dispatch);
    const request = getSeasonList();
    request(dispatch);
    const userListRequest = getUserList();
    userListRequest(dispatch);
  }, [dispatch]);
  return <Drawer content={<PanelsContent ws={ws3} />} />;
}
