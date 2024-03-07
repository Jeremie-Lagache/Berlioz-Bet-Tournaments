import React, { useEffect, useState, useRef } from 'react'
import jwt from 'jsonwebtoken'
import Profil from "../components/Profil";
import Menu from "../components/Menu";
import { useNavigate } from 'react-router-dom'
import './../stylesheets/stats.css'
import { GetUserData, getAllUsersTokens } from "./../api/getusers"
import { GetParisData } from "./../api/getparis"
import { getMatchData } from "./../api/getmatchs"

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

	async function updateParis(id, result) {
		const response = await fetch('https://berlioz-cup.onrender.com/api/update-paris', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			id : id,
			result : result
		}),
		});

		const data = await response.json();

		if (data.status === 'ok') {
			return
		} else {
			console.log("error");
		}
	}

    useEffect(() => {
		const fetchData = async () => {
			try {
				if (token) {
					const user = jwt.decode(token);
					if (!user) {
						localStorage.removeItem('token');
						history('/login');
					} else {
						const userData = await GetUserData();
	
						setId(userData._id);
						setSurname(userData.surname);
						setName(userData.name);
						setTokens(userData.tokens);
						localStorage.setItem('surname', userData.surname);
						localStorage.setItem('name', userData.name);
	
						const parisData = await GetParisData(userData._id);
	
						let wins = 0;
						let loss = 0;
	
						const updateParisPromises = parisData.map(async (paris) => {
							if (paris.result === true) {
								wins += 1;
								return Promise.resolve();
							} else {
								try {
									const matchData = await getMatchData(paris.match);
	
									if (matchData.winner && matchData.winner === paris.team) {
										return updateParis(paris.match, true);
									} else if (matchData.winner && matchData.winner !== paris.team) {
										return updateParis(paris.match, false);
									}
								} catch (error) {
									console.error(error);
								}
							}
						});
	
						await Promise.all(updateParisPromises);
	
						setWins(wins);
						setLoss(loss);
						setParis(parisData);
					}
				} else {
					history('/login');
				}
			} catch (error) {
				console.error(error);
			}
		};
	
		fetchData();
	}, [token, history]);
	
	

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