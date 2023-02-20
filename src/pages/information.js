import Drawer from "../components/Template";
import InformationContent from "../components/information/InformationContent";
import React, { useEffect } from "react";
import CheckLogin from "../CheckLogin.js";
import getInformation from "../requests/getInformation";
import { useDispatch } from "react-redux";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import getSeasonList from "../requests/getSeasonList";
export default function Information() {
  const dispatch = useDispatch();
  useEffect(() => {
    CheckLogin(dispatch);
    const request = getSeasonList();
    request(dispatch);
  }, [dispatch]);
  return <Drawer content={<InformationContent />} />;
}
