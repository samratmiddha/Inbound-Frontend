import React, { useEffect } from "react";
import CheckLogin from "../CheckLogin.js";
import "./styles/dashboard.css";
import SeasonCards from "../components/dashboard/SeasonCards.js";
import Drawer from "../components/Template";
import { useDispatch } from "react-redux";
import getSeasonList from "../requests/getSeasonList.js";

export default function Dashboard() {
  const dispatch = useDispatch();
  useEffect(() => {
    CheckLogin(dispatch);
    const request = getSeasonList();
    request(dispatch);
  }, [dispatch]);

  return <Drawer content={<SeasonCards />} />;
}
