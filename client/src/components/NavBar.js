import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const NavBar = () => {

    const [isParticipantListVisible, setIsParticipantListVisible] = useState(false);

    const naviguate = useNavigate()

    const handleVisibility = () => {
        if (isParticipantListVisible === true) {
            setIsParticipantListVisible(false)
        } else {
            setIsParticipantListVisible(true)
        }
    }

    return (
        <div className="projects-bar">
                    <img src="img/nav-icon.png" alt="" onClick={handleVisibility} />
                    {isParticipantListVisible && (
                        <ul style={{ display: isParticipantListVisible ? 'flex' : 'none' }}>
                        <NavLink to="/projects" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                        <li>Nos projects</li>
        		        </NavLink>
                        <NavLink to="/join-us" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                        <li>Nous rejoindre</li>
        		        </NavLink>
                        <NavLink to="/finance-us" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                        <li>Nous financer</li>
        		        </NavLink>
                        <NavLink to="/partenaires" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                        <li>Nos partenaires</li>
        		        </NavLink>
                    </ul>
                    )}
                </div>
    );
};

export default NavBar;