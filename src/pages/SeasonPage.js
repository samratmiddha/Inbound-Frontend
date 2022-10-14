import Drawer from "../components/Template";
import SeasonContent from "../components/season/SeasonContent";
import "./styles/seasonPage.css";
import React, { useEffect } from "react";
import CheckLogin from "../CheckLogin.js";
import getRoundList from "../requests/getRoundList";
import { useDispatch, useSelector } from "react-redux";
import getRoundCandidateList from "../requests/getRoundCandidate";

export default function SeasonPage() {
  const dispatch = useDispatch();
  const roundId = useSelector((state) => state.roundTab.value);
  let params = new URLSearchParams(window.location.search);
  const id = params.get("sid");
  useEffect(() => {
    CheckLogin();
    const request = getRoundList();
    request(dispatch, id);
    const listRequest = getRoundCandidateList();
    listRequest(dispatch, roundId);
    console.log('i');
  }, [id, dispatch, roundId]);

  return <Drawer content={<SeasonContent />} />;
}
