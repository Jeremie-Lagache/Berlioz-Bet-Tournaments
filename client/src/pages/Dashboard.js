import React, { useEffect, useState, useRef } from 'react'
import jwt from 'jsonwebtoken'
import { useNavigate } from 'react-router-dom'
import Menu from "../components/Menu";
import { NavLink } from "react-router-dom";
import { GetUserData } from "./../api/getusers"
import Profil from '../components/Profil';
import Upload from '../components/Upload';
import { BeatLoader } from 'react-spinners'; 
import UploadMatch from '../components/UploadMatch';

const Dashboard = () => {
	const history = useNavigate()
	const [username, setUsername] = useState('')
	const [surname, setSurname] = useState('')
	const [name, setName] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const avatarRef = useRef(null);
	const token = localStorage.getItem('token')

	useEffect(() => { 
		if (token) {
			const user = jwt.decode(token)
			if (!user) {
				localStorage.removeItem('token')
				history('/login')
			} else {
				setIsLoading(true)
				GetUserData()
					.then(data => (setUsername(data.username),setSurname(data.surname), setName(data.name), localStorage.setItem('jetons', data.tokens), localStorage.setItem('id', data._id), localStorage.setItem('surname', data.surname), localStorage.setItem('name', data.name), setIsLoading(false)))
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
		history('/login')
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
			{isLoading && <div className="loading-dashboard">
				<h3>Chargement de vos données en cours...</h3>
				<BeatLoader color={'white'} loading={isLoading} size={8} />
			</div>}
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
			{username === "admin" && <UploadMatch />}
		
		</div>
	)
}

export default Dashboard