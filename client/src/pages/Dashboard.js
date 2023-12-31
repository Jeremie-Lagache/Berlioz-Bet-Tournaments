import React, { useEffect, useState, useRef } from 'react'
import jwt from 'jsonwebtoken'
import { useNavigate } from 'react-router-dom'
import Menu from "../components/Menu";
import { NavLink } from "react-router-dom";
import { GetUserData } from "./../api/getusers"
import Profil from '../components/Profil';
import Upload from '../components/Upload';

const Dashboard = () => {
	const history = useNavigate()
	const [username, setUsername] = useState('')
	const [surname, setSurname] = useState('')
	const [name, setName] = useState('')
	const avatarRef = useRef(null);
	const token = localStorage.getItem('token')

	useEffect(() => { 
		if (token) {
			const user = jwt.decode(token)
			if (!user) {
				localStorage.removeItem('token')
				history('/login')
			} else {
				GetUserData()
					.then(data => (setUsername(data.username),setSurname(data.surname), setName(data.name), localStorage.setItem('jetons', data.tokens), localStorage.setItem('id', data._id), localStorage.setItem('surname', data.surname), localStorage.setItem('name', data.name)))
					.catch(error => alert(error.message))

			}
		}
		else {
			history('/login')
		}

	}, [token])

	useEffect(() => {

		setSurname(localStorage.getItem('surname'))
        setName(localStorage.getItem('name'))

	  }, [surname, name]);


	const HandleLogOut = () => {
		localStorage.clear();
		window.location.reload(false);
	}
	
	return (
		<div className='dashboard'>
			<div className="dashboard-nav-bar">
				<div className="dashboard-menu">
					<Menu />
				</div>
				<Profil HandleLogOut={() =>HandleLogOut()} forwardedRef={avatarRef}/>
			</div>
			<h1>{username} Dashboard </h1>
			<div className="menu">
				<ul>
					<NavLink to="/dashboard/stats" className={(nav) => (nav.isActive ? "nav-active" : "")}>
						<li><button>Statistiques</button></li>
					</NavLink>
					<NavLink to="/dashboard/classement" className={(nav) => (nav.isActive ? "nav-active" : "")}>
						<li><button>Classement</button></li>
					</NavLink>
					<NavLink to="/dashboard/parier" className={(nav) => (nav.isActive ? "nav-active" : "")}>
						<li><button>Parier</button></li>
					</NavLink>
				</ul>
			</div>
			{username === "admin" && <Upload />}
		
		</div>
	)
}

export default Dashboard