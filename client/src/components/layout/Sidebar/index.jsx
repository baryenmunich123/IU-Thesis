import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import UserContext from "../../../context/UserContext";

function Sidebar() {
  const { user } = useContext(UserContext);
  return (
    <div className="sidebar-container">
      <ul className="sidebar-list">
        <li>
          <Link to="/home-page" className="sidebar-item">
            Service
          </Link>
        </li>
        <li>
          <Link to="/request-list" className="sidebar-item">
            {user.role === "student" ? " My Requests" : "Student Requests"}
          </Link>
        </li>
        {user.role !== "student" && (
          <li>
            <Link to="/approval-list" className="sidebar-item">
              Approvals
            </Link>
          </li>
        )}
        {user.role === "admin" && (
          <li>
            <Link to="/form-creation" className="sidebar-item">
              Form Creation
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Sidebar;
