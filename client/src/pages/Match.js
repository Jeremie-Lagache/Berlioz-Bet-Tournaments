import React, { useEffect, useState, useRef } from 'react'
import jwt from 'jsonwebtoken'
import Menu from "../components/Menu";
import Profil from "../components/Profil";
import { useNavigate } from 'react-router-dom'
import { getMatchData } from '../api/getmatchs';
import BettingForm from '../components/BettingForm';

const Match = () => {

    const history = useNavigate()
	const avatarRef = useRef(null);
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [matchData, setMatchData] = useState({})
	const userId = localStorage.getItem('id')

    useEffect(() => { 
		if (token) {
			const user = jwt.decode(token)
			if (!user) {
				localStorage.removeItem('token')
				history('/login') 
			} else {
                const url = window.location.pathname;
                const parts = url.split('/');
                const id = parts[parts.length - 1];
                getMatchData(id).then(data => (setMatchData(data)))
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
        <div className='paris'>
            <div className="dashboard-nav-bar">
				<div className="dashboard-menu">
					<Menu />
				</div>
				<Profil HandleLogOut={() =>HandleLogOut()} forwardedRef={avatarRef}/>
			</div>
			{matchData.teams && matchData.teams.length === 2 && (
            <h1>{matchData.teams[0]} VS {matchData.teams[1]}</h1>
        	)}
			<div className="bet-interface">
				{matchData.teams && <BettingForm matchData={matchData} />}
			</div>
        </div>
    );
};

export default Match;