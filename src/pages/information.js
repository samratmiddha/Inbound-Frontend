import Drawer from "../components/Template";
import InformationContent from "../components/information/InformationContent";
import React, { useEffect } from "react";
import CheckLogin from "../CheckLogin.js";

export default function Information() {
  useEffect(() => {
    CheckLogin();
  }, []);
  return <Drawer content={<InformationContent />} />;
}
