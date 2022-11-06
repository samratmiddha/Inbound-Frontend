import Drawer from "../components/Template";
import SeasonContent from "../components/season/SeasonContent";
import "./styles/seasonPage.css";
import React, { useEffect } from "react";
import CheckLogin from "../CheckLogin.js";
import getRoundList from "../requests/getRoundList";
import { useDispatch, useSelector } from "react-redux";
import getRoundCandidateList from "../requests/getRoundCandidate";
import getSeasonCandidateList from "../requests/getSeasonCandidateList";
import getUserList from "../requests/getUserList";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import BackendClient from "../BackendClient";
import { changeSeasonValue } from "../features/seasonSlice";

export default function SeasonPage() {
  const dispatch = useDispatch();
  const roundId = useSelector((state) => state.roundTab.value);
  let params = new URLSearchParams(window.location.search);
  const id = params.get("sid");
  // const client = new W3CWebSocket("ws://127.0.0.1:8000/anchor/");
  // useEffect(() => {
  //   client.onopen = () => {
  //     console.log("WebSocket Client Connected");
  //     BackendClient.get("marks/get_marks_by_round/1/").then((res) => {
  //       console.log(res);
  //     });
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
  // }, [client]);
  useEffect(() => {
    CheckLogin(dispatch);
    const request = getRoundList();
    request(dispatch, id);

    console.log("i");
    const candidateListRequest = getSeasonCandidateList();
    candidateListRequest(dispatch, id);
    const userListRequest = getUserList();
    userListRequest(dispatch);
    dispatch(changeSeasonValue(id));
  }, [id, dispatch]);

  return <Drawer content={<SeasonContent />} />;
}
