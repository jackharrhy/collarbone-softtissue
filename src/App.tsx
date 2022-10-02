import { Link, Outlet } from "react-router-dom";

export const App = () => (
  <>
    <nav>
      <Link to="/collarbone-softtissue">Collarbone Softtissue</Link>
      <Link to="/mitchell-hynes-student">Mitchell Hynes Student</Link>
      <Link to="/stare">Stare</Link>
    </nav>
    <main>
      <Outlet />
    </main>
  </>
);
