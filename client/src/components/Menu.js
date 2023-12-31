import React from "react";
import { NavLink } from "react-router-dom";

const Naviguation = () => {
  return (
    <div className="menu">
      <ul>
        <NavLink
          to="/dashboard"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <li><img src="../../img/home.png" alt="" /></li>
        </NavLink>
        <NavLink 
          to="/dashboard/stats"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <li><img src="../../img/stats.png" alt="" /></li>
        </NavLink>
        <NavLink 
          to="/dashboard/classement"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <li><img src="../../img/classement.png" alt="" /></li>
        </NavLink>
        {/* <NavLink 
          to="/stats"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <li><img src="../../img/stats.png" alt="" /></li>
        </NavLink> */}
      </ul>
    </div> 
  );
};

export default Naviguation;