import React, { useEffect } from "react";
import CheckLogin from "../CheckLogin.js";
import BackendClient from "../BackendClient";

function SeasonData() {
  var seasondata = BackendClient.get("seasons").then((res) => {
    return res.data;
  });
  console.log(seasondata);
}

export default function Dashboard() {
  useEffect(() => {
    CheckLogin();
    SeasonData();
    console.log("hi");
  }, []);

  return "welcome";
}
