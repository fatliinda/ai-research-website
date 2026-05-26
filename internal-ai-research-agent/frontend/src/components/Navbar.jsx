import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <div className="logo">
        <span className="logo-icon">✦</span>
        <div>
          <h2>AI Research</h2>
          <p>Agent</p>
        </div>
      </div>

      <nav>
        <Link
          className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
          to="/"
        >
          Dashboard
        </Link>

        <Link
          className={`nav-link ${
            location.pathname === "/generate" ? "active" : ""
          }`}
          to="/generate"
        >
          Generate Report
        </Link>
      </nav>

    </aside>
  );
}

export default Navbar;