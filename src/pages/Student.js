import { useParams } from "react-router-dom";
import Drawer from "../components/Template";
import StudentContent from "../components/student/StudentContent";

export default function Student() {
  let { id } = useParams();
  return <Drawer content={<StudentContent id={id} />} />;
}
