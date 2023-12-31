import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Menu from "../components/Menu";
import { NavLink } from "react-router-dom";
import Matchs from '../components/Matchs';
import './../stylesheets/matchs.css'
import './../stylesheets/parier.css'
import { getAllMatchs } from "./../api/getmatchs"
import Profil from '../components/Profil';

const Parier = () => {

	const history = useNavigate()
    const [username, setUsername] = useState('')
	const [surname, setSurname] = useState('')
	const [name, setName] = useState('')
    const [matchsData, setMatchsData] = useState([])
    const avatarRef = useRef(null);
	const [token, setToken] = useState(localStorage.getItem('token'))

	useEffect(() => {

		setSurname(localStorage.getItem('surname'))
        setName(localStorage.getItem('name'))

		if (surname && name) {
            getAllMatchs()
                .then(data => (setMatchsData(data)))
                .catch(error => alert(error.message))
		}
	  }, [surname, name]);

	const handleMatch = (sport, matchTeams, matchCotes, id) => {
  		history(`/matchs/${id}`);
	}

    const HandleLogOut = () => {
		localStorage.clear();
		window.location.reload(false);
	}
	
	return (
		<div className='parier'>
			<div className="dashboard-nav-bar">
				<div className="dashboard-menu">
					<Menu />
				</div>
				<Profil HandleLogOut={() =>HandleLogOut()} forwardedRef={avatarRef}/>
			</div>
			<h1>{username} Matchs </h1>
			<div className="matchs">
				{
				matchsData.map((match, index) => (
					<Matchs key={index} sport={match.sport} teams={match.teams} tour={match.tour} cotes={match.cotes} state={match.state} handleMatch={() => handleMatch(match.sport, match.teams, match.cotes, match._id)} />
					))
				}
			</div>
		
		</div>
	)
}

export default Parier