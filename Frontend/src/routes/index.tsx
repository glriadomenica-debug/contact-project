import { useRoutes } from "react-router-dom";
import ContactRoutes from "../modules/contacts/route";

export default function AppRoutes() {
  return useRoutes([...ContactRoutes]);
}
