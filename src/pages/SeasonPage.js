import Drawer from "../components/Template";
import SeasonContent from "../components/season/SeasonContent";
import { Box } from "@mui/system";
import "./styles/seasonPage.css";

export default function SeasonPage() {
  let params = new URLSearchParams(window.location.search);
  const id = params.get("sid");
  console.log(id);
  return <Drawer content={<SeasonContent />} />;
}
