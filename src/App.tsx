import { Link, Outlet } from "react-router-dom";

// <Link to="/collarbone-softtissue">Collarbone Softtissue</Link>

export const App = () => (
  <>
    <nav>
      <Link to="/mitchell-hynes-student">Mitchell Hynes Student</Link>
      <Link to="/stare">Stare</Link>
    </nav>
    <main>
      <Outlet />
    </main>
  </>
);
