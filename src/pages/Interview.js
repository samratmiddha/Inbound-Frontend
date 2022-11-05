import React, { useEffect } from "react";
import CheckLogin from "../CheckLogin.js";
import Drawer from "../components/Template";
import InterviewContent from "../components/interview/InterviewContent.js";
import { useDispatch } from "react-redux";
import getSectionList from "../requests/getSectionList.js";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import BackendClient from "../BackendClient.js";

export default function Interview() {
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
  BackendClient.get("round_candidates/get_marks_by_round/4/").then((res) => {
    console.log("yay", res.data);
  });
  BackendClient.get("sections/get_section_groups/4/").then((res) => {
    console.log("yay2", res.data);
  });
  const dispatch = useDispatch();
  useEffect(() => {
    CheckLogin(dispatch);
    const request = getSectionList();
    request(dispatch, "1");
  }, [dispatch]);

  return <Drawer content={<InterviewContent />} />;
}
