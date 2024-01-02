import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Menu from "../components/Menu";
import { NavLink } from "react-router-dom";
import Matchs from '../components/Matchs';
import './../stylesheets/matchs.css'
import './../stylesheets/parier.css'
import { getAllMatchs, getAllTeams } from "./../api/getmatchs"
import Profil from '../components/Profil';

const Parier = () => {

	const history = useNavigate()
    const [username, setUsername] = useState('')
	const [surname, setSurname] = useState('')
	const [name, setName] = useState('')
    const [matchsData, setMatchsData] = useState([])
    const [teams, setTeams] = useState([])
    const avatarRef = useRef(null);
	const [token, setToken] = useState(localStorage.getItem('token'))
    const [sort, setSort] = useState({
		sport : "",
		teams : "",
		tour : "",
		state : ""
	})

	useEffect(() => {

		setSurname(localStorage.getItem('surname'))
        setName(localStorage.getItem('name'))

		if (surname && name) {
            getAllMatchs()
                .then(data => (setMatchsData(data)))
                .catch(error => alert(error.message))
			getAllTeams()
				.then(data => (setTeams(data)))
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
			<div className="sort-bar">
				<select onChange={(e) => setSort((prevSort) => ({...prevSort, sport: e.target.value }))}>
					<option value=''>Sport</option>
					<option value="Football">Football</option>
					<option value="Basketball">Basketball</option>
				</select>
				<select onChange={(e) => setSort((prevSort) => ({...prevSort, teams: e.target.value }))}>
					<option value=''>Equipe</option>
					{teams.map((team, index) => (
						<option value={team.classe}>{team.classe}</option>
					))}
				</select>
				<select onChange={(e) => setSort((prevSort) => ({...prevSort, tour: e.target.value }))}>
					<option value=''>Tour</option>
					<option value="poule A">poule A</option>
					<option value="poule B">poule B</option>
				</select>
				<select onChange={(e) => setSort((prevSort) => ({...prevSort, state: e.target.value }))}>
					<option value=''>Status</option>
					<option value="en cours">en cours</option>
					<option value="bientôt">bientôt</option>
					<option value="fini">fini</option>
				</select>
			</div>
			<div className="matchs">
			{matchsData
      		.filter((match) => {
       		 const { sport, teams, tour, state } = sort;
        		return (
          			(!sport || match.sport === sport) &&
        			(!teams || match.teams.includes(teams)) &&
          			(!tour || match.tour === tour) &&
          			(!state || match.state === state)
        		);
      		})
      		.map((match, index) => (
        		<Matchs
         			key={index}
          			sport={match.sport}
        			teams={match.teams}
          			tour={match.tour}
          			cotes={match.cotes}
          			state={match.state}
					score={match.score}
          			handleMatch={() => handleMatch(match.sport, match.teams, match.cotes, match._id)}
        		/>
      		))}
			</div>
		
		</div>
	)
}

export default Parier