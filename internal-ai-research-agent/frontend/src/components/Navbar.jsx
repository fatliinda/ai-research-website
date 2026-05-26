import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="mobile-menu-btn" onClick={() => setOpen(true)}>
        ☰
      </button>

      <div
        className={`sidebar-overlay ${open ? "show" : ""}`}
        onClick={() => setOpen(false)}
      />

      <aside className={`sidebar ${open ? "open" : ""}`}>
        <button className="sidebar-close" onClick={() => setOpen(false)}>
          ×
        </button>

        <div className="logo">
          <span className="logo-icon">✦</span>
          <div>
            <h2>AI Research</h2>
            <p>Agent</p>
          </div>
        </div>

        <nav>
          <Link
            onClick={() => setOpen(false)}
            className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
            to="/"
          >
            Dashboard
          </Link>

          <Link
            onClick={() => setOpen(false)}
            className={`nav-link ${
              location.pathname === "/generate" ? "active" : ""
            }`}
            to="/generate"
          >
            Generate Report
          </Link>
        </nav>
      </aside>
    </>
  );
}

export default Navbar;