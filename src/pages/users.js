import React, { useEffect } from "react";
import CheckLogin from "../CheckLogin.js";
import Drawer from "../components/Template";
import UsersContent from "../components/users/UsersContent.js";
import { useDispatch } from "react-redux";
import getUserList from "../requests/getUserList.js";

export default function Users() {
  const dispatch = useDispatch();
  useEffect(() => {
    CheckLogin(dispatch);
    const request = getUserList();
    request(dispatch);
  }, [dispatch]);

  return <Drawer content={<UsersContent />} />;
}
