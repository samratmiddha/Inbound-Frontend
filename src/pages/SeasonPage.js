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
  useEffect(() => {
    console.log(roundId, "testinngg");
  }, [roundId]);
  let params = new URLSearchParams(window.location.search);
  const id = params.get("sid");
  const ws = new WebSocket("ws://localhost:8000/anchor/");
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
  }, [id, dispatch, roundId]);

  return <Drawer content={<SeasonContent ws={ws} />} />;
}
