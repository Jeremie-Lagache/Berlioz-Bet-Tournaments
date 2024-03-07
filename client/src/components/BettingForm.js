import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { GetCotesData } from "./../api/getparis"
import './../stylesheets/bettingform.css'

const BettingForm = ({ matchData, id }) => {
  const [team, setTeam] = useState(null);
  const [jetons, setJetons] = useState(0);
  const [balance, setBalance] = useState(true);
  const [cotes, setCotes] = useState([]);
  const user_id = localStorage.getItem('id')
  const [score, setScore] = useState({
    0: '',
    1: '',
  });
  const [buteurs, setButeurs] = useState({
    0: [],
    1: [],
  });
  const naviguate = useNavigate()

  useEffect(() => {
    console.log(id);
    GetCotesData(id)
      .then((cotes) => setCotes(cotes))
  }, [])

  async function createPari(event) {
    event.preventDefault();

    const tokens = parseInt(localStorage.getItem('jetons'))
    if (jetons > tokens) {
      setBalance(false);
      return;
    }

    let predict = ""

    if (team !== 2) {
      predict = matchData.teams[team]
    } else {
      predict = "nul"
    }

    const response = await fetch('https://berlioz-cup.onrender.com/api/create-paris', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        index : team,
        sport: matchData.sport,
        match : id,
        parieur: user_id,
        cote: matchData.cotes[team],
        team: predict,
        state: 'en cours',
        result: false
      }),
    });

    const data = await response.json();

    if (data.status === 'ok') {
      naviguate('/')
    } else {
      alert("error")
    }
  }

  return (
    <form onSubmit={createPari} className="betting-form">
      <div className="team-buttons">
        {matchData.teams.map((teamName, index) => (
          <div className="pari">
            <button
            type='button'
            key={index}
            onClick={() => setTeam(index)}
            className={`team-button ${team === index ? 'selected' : ''}`}
            >
              {teamName}
            </button>
            <div className='cote'>
              {cotes[index]}</div>
          </div>
        ))}
        <div className="pari">
          <button
              type='button'
              onClick={() => setTeam(2)}
              className={`team-button ${team === 2 ? 'selected' : ''}`}
            >
              Match nul
            </button>
            <div className='cote'>
              {cotes[2]}
            </div>
        </div>
      </div>
      
      <input 
        type="submit" 
        value="Parier"
      />
    </form>
  );
};

export default BettingForm;
