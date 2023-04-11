import { useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { authActions } from "_store";

export { Sidebar };

function Sidebar(props) {
  const dispatch = useDispatch();

  const logout = () => dispatch(authActions.logout());

  const location = useLocation();

  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <NavLink
            to={"/"}
            className={
              location.pathname === "/" ? "nav-link " : "nav-link collapsed"
            }
          >
            <i className="bi bi-grid"></i>
            <span>Dashboard</span>
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to={"/properties"}
            className={
              location.pathname === "/properties"
                ? "nav-link "
                : "nav-link collapsed"
            }
          >
            <i className="bi bi-grid"></i>
            <span>Properties</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to={"/bookings"}
            className={
              location.pathname === "/bookings"
                ? "nav-link "
                : "nav-link collapsed"
            }
          >
            <i className="bi bi-journal-text"></i>
            <span>Bookings</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink onClick={logout} className="nav-link collapsed">
            <i className="bi bi-box-arrow-right"></i>
            <span>Logout</span>
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}
