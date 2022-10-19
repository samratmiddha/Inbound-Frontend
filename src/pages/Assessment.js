import React, { useEffect } from "react";
import CheckLogin from "../CheckLogin.js";
import Drawer from "../components/Template";
import AssessmentContent from "../components/assessment/AssessmentContent.js";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import getRoundCandidateList from "../requests/getRoundCandidate";
import getRoundList from "../requests/getRoundList";

export default function Assessment() {
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
    console.log("i");
  }, [id, dispatch, roundId]);

  return <Drawer content={<AssessmentContent />} />;
}
