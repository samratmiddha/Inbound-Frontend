import React, { useEffect } from "react";
import CheckLogin from "../CheckLogin.js";

export default function Interview() {
  useEffect(() => {
    CheckLogin();
  }, []);

  return "Interview";
}
