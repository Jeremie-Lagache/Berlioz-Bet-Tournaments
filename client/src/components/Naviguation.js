import React from "react";
import { NavLink } from "react-router-dom";

const Naviguation = () => {
  return (
    <div className="naviguation">
      <ul>
        <NavLink
          to="/login"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <li>Se connecter</li>
        </NavLink>
        <NavLink 
          to="/register"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <li>S'inscrire</li>
        </NavLink>
      </ul>
    </div> 
  );
};

export default Naviguation;