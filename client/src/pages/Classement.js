import React, { useEffect, useState, useRef } from 'react'
import jwt from 'jsonwebtoken'
import Menu from "../components/Menu";
import Profil from "../components/Profil";
import { useNavigate } from 'react-router-dom'
import { getAllUsersTokens } from "./../api/getusers"

const Classement = () => {

    const history = useNavigate()
	const avatarRef = useRef(null);
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [usersData, setUsersData] = useState([])

    useEffect(() => { 
		if (token) {
			const user = jwt.decode(token)
			if (!user) {
				localStorage.removeItem('token')
				history('/login')
			} else {
                getAllUsersTokens().then(data => (setUsersData(data)))
			}
		}
		else {
			history('/login')
		}

	}, [token])

	const HandleLogOut = () => {
		localStorage.clear();
		window.location.reload(false);
	}

    return (
        <div className='classement-page'>
            <div className="dashboard-nav-bar">
				<div className="dashboard-menu">
					<Menu />
				</div>
				<Profil HandleLogOut={() =>HandleLogOut()} forwardedRef={avatarRef}/>
			</div>
			<h1>Classement</h1>
			<div className='classement'>
            <h2>Classement des joueurs par nombre de tokens</h2>
            <table className='classement-table'>
                <thead>
                    <tr>
                        <th>Position</th>
                        <th>Joueur</th>
                        <th>Tokens</th>
                    </tr>
                </thead>
                <tbody>
                {
                usersData
                    .slice() 
                    .sort((a, b) => a.tokens - b.tokens) 
                    .map((user, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{user.surname + " " + user.name}</td>
                        <td>{user.tokens}</td>
                    </tr>
                    ))
                }

                </tbody>
            </table>
        </div>
        </div>
    );
};

export default Classement;