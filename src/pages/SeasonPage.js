import Drawer from "../components/season/Drawer";

export default function SeasonPage() {
  let params = new URLSearchParams(window.location.search);
  const id = params.get("sid");
  console.log(id);
  return <Drawer />;
}
