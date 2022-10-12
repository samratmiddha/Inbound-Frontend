import React, { useEffect } from "react";
import CheckLogin from "../CheckLogin.js";
import "./styles/dashboard.css";
import SeasonCards from "../components/dashboard/SeasonCards.js";
import Drawer from "../components/Template";

export default function Dashboard() {
  useEffect(() => {
    CheckLogin();
  }, []);

  return <Drawer content={<SeasonCards />} />;
}
