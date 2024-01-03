import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './../stylesheets/bettingform.css'

const BettingForm = ({ matchData }) => {
  const [team, setTeam] = useState(null);
  const [jetons, setJetons] = useState(0);
  const [balance, setBalance] = useState(true);
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

  async function updateJetons(id) {

    const response = await fetch('https://berlioz-cup.onrender.com/api/update-jetons', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        jetons,
      }),
    });

    const data = await response.json();
  }

  async function createPari(event) {
    event.preventDefault();

    const tokens = parseInt(localStorage.getItem('jetons'))
    if (jetons > tokens) {
      setBalance(false);
      return;
    }


    const response = await fetch('https://berlioz-cup.onrender.com/api/create-paris', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sport: matchData.sport,
        match : `${matchData.teams[0]} VS ${matchData.teams[1]}`,
        parieur: user_id,
        cote: matchData.cotes[team],
        team: matchData.teams[team],
        jetons: jetons,
        state: 'en cours',
        result: false
      }),
    });

    const data = await response.json();

    if (data.status === 'ok') {
      updateJetons(user_id)
      localStorage.setItem('jetons', (tokens - jetons))
      naviguate('/')
    }
  }

  return (
    <form onSubmit={createPari} className="betting-form">
      <div className="team-buttons">
        {matchData.teams.map((teamName, index) => (
          <button
            type='button'
            key={index}
            onClick={() => setTeam(index)}
            className={`team-button ${team === index ? 'selected' : ''}`}
          >
            {teamName}
          </button>
        ))}
      </div>
      <input 
        value={jetons}
        type="range"
        onChange={(e) => setJetons(e.target.value)}        
      />
      <p>{jetons}</p>
      <input 
        type="submit" 
        value="Parier"
      />
      {balance === false && <p style={{color: 'red'}}>Vous n'avez pas assez de jetons</p>}
    </form>
  );
};

export default BettingForm;
