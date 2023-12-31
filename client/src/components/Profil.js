import React, { useRef, useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";

const Profil = ({ HandleLogOut, forwardedRef }) => {

    const avatarRef = useRef(null);
    const listRef = useRef(null);
    const [displayStyle, setDisplayStyle] = useState("none");

  useEffect(() => {
    forwardedRef.current = avatarRef.current;
    forwardedRef.current = listRef.current;

    const handleClick = () => {
        setDisplayStyle((prevStyle) => (prevStyle === "flex" ? "none" : "flex"));
    };

    if (avatarRef.current) {
      avatarRef.current.addEventListener('click', handleClick);
    }

    return () => {
      if (avatarRef.current) {
        avatarRef.current.removeEventListener('click', handleClick);
      }
    };
  }, [forwardedRef]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.style.display = displayStyle;

    }
  }, [displayStyle]);

    return (
        <div className='profil'>
            <div className="profil-avatar" ref={avatarRef}>
                <img src="/img/profil.png" alt="Profil" />
            </div>
            <div className="profil-list" ref={listRef}>
                <ul>
                    <li>
                        <NavLink to="/dashboard/profil" className={(nav) => (nav.isActive ? "nav-active" : "")}>
          		        <li>Profil</li>
        		        </NavLink>
                    </li>
                    <li><button onClick={HandleLogOut}>Déconnexion</button></li>
                </ul>
            </div>
        </div>
    );
};

export default Profil;