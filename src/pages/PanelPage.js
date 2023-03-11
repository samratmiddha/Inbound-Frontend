import { useParams } from "react-router-dom";
import Drawer from "../components/Template";
import PanelContent from "../components/panel/PanelContent";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import CheckLogin from "../CheckLogin";

export default function PanelPage() {
  let { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    CheckLogin(dispatch);
  }, []);
  const ws4 = new WebSocket(`ws://localhost:8000/chat/${id}/`);
  ws4.onopen = (event) => {
    // console.log("connected");
  };
  ws4.onclose = (event) => {
    // console.log("disconnected");
  };

  return <Drawer content={<PanelContent id={id} ws={ws4} />} />;
}
