import React, { useEffect } from "react";
import CheckLogin from "../CheckLogin.js";
import Drawer from "../components/Template";
import AssessmentContent from "../components/assessment/AssessmentContent.js";
export default function Assessment() {
  useEffect(() => {
    CheckLogin();
  }, []);

  return <Drawer content={<AssessmentContent />} />;
}
