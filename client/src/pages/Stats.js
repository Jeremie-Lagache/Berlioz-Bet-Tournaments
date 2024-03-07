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
	const [wins, setWins] = useState(0)
	const [loss, setLoss] = useState(0)
    const token = localStorage.getItem('token')

    useEffect(() => { 
		if (token) {
			const user = jwt.decode(token)
			if (!user) {
				localStorage.removeItem('token')
				history('/login')
			} else {
				GetUserData()
					.then(data => {
						setId(data._id);
						setSurname(data.surname);
						setName(data.name);
						setTokens(data.tokens);
						localStorage.setItem('surname', data.surname);
						localStorage.setItem('name', data.name);
						
						GetParisData(data._id)
							.then(parisData => {
								let wins = 0
								let loss = 0
								setParis(parisData)
								for (const paris in parisData) {
									if (parisData[paris].result === true) {
										wins += 1
									}
								}
								setWins(wins)
								setLoss(loss)
							})
							.catch(error => console.error(error));
					})
					.catch(error => alert(error.message))
			}
		}
		else {
			history('/login')
		}
	}, [token])
	

	const HandleLogOut = () => {
		localStorage.clear();
		window.location.reload(false);
		history('/login')
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
					<ul>
						<div className="title">Mes pronos</div>
						<div className="pronos-stats">
							<div className="pronos-tot">
								<div className="cercle">{paris.length}</div>
								<p>pronos faits</p>
							</div>
							<div className="pronos-wins">
								<div className="cercle">{wins}</div>
								<p>pronos exactes</p>
							</div>
							<div className="pronos-loss">
								<div className="cercle">{loss}</div>
								<p>pronos ratés</p>
							</div>
						</div>
					</ul>
				</div>
			</div>
			<div className="evolution">

			</div> 
        </div>
    );
};

export default Stats;