import React, { useEffect } from "react";
import CheckLogin from "../CheckLogin.js";
import Drawer from "../components/Template";
import InterviewContent from "../components/interview/InterviewContent.js";
import { useDispatch } from "react-redux";
import getSectionList from "../requests/getSectionList.js";

export default function Interview() {
  const dispatch = useDispatch();
  useEffect(() => {
    CheckLogin(dispatch);
    const request = getSectionList();
    request(dispatch, "1");
  }, [dispatch]);

  return <Drawer content={<InterviewContent />} />;
}
