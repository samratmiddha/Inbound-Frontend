import Drawer from "../components/Template";
import AssessmentContent from "../components/assessment/AssessmentContent";
import { useEffect } from "react";
import CheckLogin from "../CheckLogin";
import { useDispatch } from "react-redux";
import getSeasonList from "../requests/getSeasonList";

export default function Assessment() {
  const dispatch = useDispatch();
  useEffect(() => {
    CheckLogin(dispatch);
    const request = getSeasonList();
    request(dispatch);
  }, [dispatch]);
  return <Drawer content={<AssessmentContent />} />;
}
