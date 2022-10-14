import React, { useEffect } from "react";
import CheckLogin from "../CheckLogin.js";
import Drawer from "../components/Template";
import InterviewContent from "../components/interview/InterviewContent.js";

export default function Interview() {
  useEffect(() => {
    CheckLogin();
  }, []);

  return <Drawer content={<InterviewContent />} />;
}
