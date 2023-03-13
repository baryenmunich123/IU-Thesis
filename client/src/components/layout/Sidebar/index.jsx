import React from 'react'
import { Link } from "react-router-dom";
import './Sidebar.css'

function Sidebar() {
  return (
    <div className='sidebar-container'>
      <ul className="sidebar-list">
        <li><Link to="/home-page" className="sidebar-item">Service</Link></li>
        <li><Link to="/request-list" className="sidebar-item">My Requests</Link></li>
        <li><Link to="/approval-list" className="sidebar-item">Approvals</Link></li>
      </ul>
    </div>
  )
}

export default Sidebar