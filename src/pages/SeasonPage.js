import Drawer from "../components/Template";
import SeasonContent from "../components/season/SeasonContent";
import "./styles/seasonPage.css";
import React, { useEffect } from "react";
import CheckLogin from "../CheckLogin.js";

export default function SeasonPage() {
  useEffect(() => {
    CheckLogin();
  }, []);

  let params = new URLSearchParams(window.location.search);
  const id = params.get("sid");
  console.log(id);
  return <Drawer content={<SeasonContent />} />;
}
