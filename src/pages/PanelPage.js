import { useParams } from "react-router-dom";
import Drawer from "../components/Template";
import PanelContent from "../components/panel/PanelContent";

export default function PanelPage() {
  let { id } = useParams();
  return <Drawer content={<PanelContent id={id} />} />;
}
