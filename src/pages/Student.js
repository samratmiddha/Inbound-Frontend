import { useParams } from "react-router-dom";
import Drawer from "../components/Template";
import StudentContent from "../components/student/StudentContent";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import CheckLogin from "../CheckLogin";

export default function Student() {
  let { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    CheckLogin(dispatch);
  });
  return <Drawer content={<StudentContent id={id} />} />;
}
