import React, { useEffect, useState, useRef } from 'react'
import jwt from 'jsonwebtoken'
import Profil from "../components/Profil";
import Menu from "../components/Menu";
import { useNavigate } from 'react-router-dom'
import './../stylesheets/stats.css'
import { GetUserData, getAllUsersTokens } from "./../api/getusers"
import { GetParisData } from "./../api/getparis"

const Stats = () => {

    const history = useNavigate()
	const avatarRef = useRef(null);
	const [id, setId] = useState('')
	const [username, setUsername] = useState('')
	const [surname, setSurname] = useState('')
	const [name, setName] = useState('')
	const [tokens, setTokens] = useState('')
	const [paris, setParis] = useState([])
    const token = localStorage.getItem('token')

    useEffect(() => { 
		if (token) {
			const user = jwt.decode(token)
			if (!user) {
				localStorage.removeItem('token')
				history('/login')
			} else {
				GetUserData()
					.then(data => (setId(data._id),setSurname(data.surname), setName(data.name), setTokens(data.tokens) ,localStorage.setItem('surname', data.surname), localStorage.setItem('name', data.name)))
					.catch(error => alert(error.message))
				{id && GetParisData(id).then(data => setParis(data))}
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
        <div className='stats'>
            <div className="dashboard-nav-bar">
				<div className="dashboard-menu">
					<Menu />
				</div>
				<Profil HandleLogOut={() =>HandleLogOut()} forwardedRef={avatarRef}/>
			</div>
			<h1>Statistiques</h1>
			<div className="stats-container">
				<div className="solde">
					<ul>
						<li>Solde : </li>
						<li>{tokens}</li>
						<li>TOKENS</li>
					</ul>
				</div>
				<div className="pronos">
					Mes pronos
				</div>
			</div>
			<div className="evolution">

			</div>
        </div>
    );
};

export default Stats;