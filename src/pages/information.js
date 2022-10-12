import Drawer from "../components/Template";
import InformationContent from "../components/information/InformationContent";
import React, { useEffect } from "react";
import CheckLogin from "../CheckLogin.js";
import getInformation from "../requests/getInformation";
import { useDispatch } from "react-redux";

export default function Information() {
  const dispatch = useDispatch();
  useEffect(() => {
    CheckLogin();
    const request = getInformation();
    request(dispatch);
  }, [dispatch]);
  return <Drawer content={<InformationContent />} />;
}
