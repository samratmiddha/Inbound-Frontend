import React, { useEffect } from "react";
import CheckLogin from "../CheckLogin.js";

import SeasonCards from "../components/dashboard/SeasonCards.js";

export default function Dashboard() {
  useEffect(() => {
    CheckLogin();
  }, []);

  return <SeasonCards />;
}
