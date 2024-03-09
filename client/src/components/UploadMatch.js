import React, { useState } from 'react';

const UploadMatch = () => {
  const initialMatchState = {
    sport: '',
    teams: ['', ''],
    tour: '',
    date: '',
  };

  const [match, setMatch] = useState(initialMatchState);

  const handleInputChange = (field, value) => {
    setMatch({ ...match, [field]: value });
  };

  const handleTeamsChange = (index, value) => {
    const updatedTeams = [...match.teams];
    updatedTeams[index] = value;
    setMatch({ ...match, teams: updatedTeams });
  };

  const createMatch = async (event) => {
    event.preventDefault();

    const response = await fetch('https://berlioz-cup.onrender.com/api/create-matchs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        match,
      }),
    });

    const data = await response.json();

    if (data.status === 'ok') {
      alert('Match created');
      setMatch(initialMatchState);
    }
  };

  return (
    <div className="create-match">
      <form onSubmit={createMatch}>
        <input
          type="text"
          value={match.sport}
          onChange={(e) => handleInputChange('sport', e.target.value)}
          placeholder="Sport"
        />
        <input
          type="text"
          value={match.tour}
          onChange={(e) => handleInputChange('tour', e.target.value)}
          placeholder="Tour"
        />
        <input
          type="text"
          value={match.date}
          onChange={(e) => handleInputChange('date', e.target.value)}
          placeholder="Date"
        />
        {match.teams.map((team, index) => (
          <div key={index}>
            <input
              type="text"
              value={team}
              onChange={(e) => handleTeamsChange(index, e.target.value)}
              placeholder={`Team ${index + 1}`}
            />
          </div>
        ))}
        <button type="submit">Create Match</button>
      </form>
    </div>
  );
};

export default UploadMatch;
