import React, { useEffect } from "react";
import CheckLogin from "../CheckLogin.js";
import Drawer from "../components/Template";
import AssessmentContent from "../components/assessment/AssessmentContent.js";
import { useDispatch } from "react-redux";
import getSeasonList from "../requests/getSeasonList.js";

export default function Assessment() {
  const dispatch = useDispatch();
  useEffect(() => {
    CheckLogin(dispatch);
    const request = getSeasonList();
    request(dispatch);
  }, [dispatch]);

  return <Drawer content={<AssessmentContent />} />;
}
