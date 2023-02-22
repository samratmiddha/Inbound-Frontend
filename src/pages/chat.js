import React, { useEffect, useState } from "react";
import CheckLogin from "../CheckLogin.js";
import Drawer from "../components/Template";
import { useDispatch } from "react-redux";
import ChatContent from "../components/chat/ChatContent.js";

export default function Chat() {
  const ws2 = new WebSocket(`${process.env.BACKEND_HOST}chat/`);
  ws2.onopen = (event) => {
    // console.log("connected");
  };
  ws2.onclose = (event) => {
    // console.log("disconnected");
  };
  const dispatch = useDispatch();
  useEffect(() => {
    CheckLogin(dispatch);
  }, [dispatch]);

  return <Drawer content={<ChatContent ws={ws2} />} />;
}
