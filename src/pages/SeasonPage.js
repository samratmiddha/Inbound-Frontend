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
import { changeRoundValue } from "../features/roundTabSlice";

export default function SeasonPage() {
  const dispatch = useDispatch();
  let params = new URLSearchParams(window.location.search);
  const id = params.get("sid");
  const ws = new WebSocket("ws://localhost:8000/anchor/");

  useEffect(() => {
    CheckLogin(dispatch);
    const request = getRoundList();
    request(dispatch, id);
    const candidateListRequest = getSeasonCandidateList();
    candidateListRequest(dispatch, id);
    const userListRequest = getUserList();
    userListRequest(dispatch);
    dispatch(changeSeasonValue(id));
    changeRoundValue(0);
  }, [id, dispatch]);

  return <Drawer content={<SeasonContent ws={ws} />} />;
}
