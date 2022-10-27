import React, { useEffect } from "react";
import CheckLogin from "../CheckLogin.js";
import Drawer from "../components/Template";
import InterviewContent from "../components/interview/InterviewContent.js";
import { useDispatch } from "react-redux";

export default function Interview() {
  const dispatch = useDispatch();
  useEffect(() => {
    CheckLogin(dispatch);
  }, [dispatch]);

  return <Drawer content={<InterviewContent />} />;
}
