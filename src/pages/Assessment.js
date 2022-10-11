import React, { useEffect } from "react";
import CheckLogin from "../CheckLogin.js";

export default function Assessment() {
  useEffect(() => {
    CheckLogin();
  }, []);

  return "Assessment";
}
