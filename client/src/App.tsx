/* Deep-Ocean routing shell: the portfolio owns the root route and all unknown paths resolve to the branded 404. */
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

export default function App() {
  const pathname = window.location.pathname.replace(/\/+$/, "") || "/";
  return pathname === "/" ? <Home /> : <NotFound />;
}
