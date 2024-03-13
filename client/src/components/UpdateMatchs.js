import React, { useState } from 'react';

const UpdateMatchs = () => {
    const initialMatchState = { teamA: '', teamB: '', winner: '', score: '' };
    const [matches, setMatches] = useState([initialMatchState]);

    const handleMatchInputChange = (index, field, value) => {
        const updatedMatches = [...matches];
        updatedMatches[index][field] = value;
        setMatches(updatedMatches);
    };

    const addMatch = () => {
        setMatches([...matches, initialMatchState]);
    };

    async function updateMatches(event) {
        event.preventDefault();

        const requestBody = {
            winners: matches.map(match => match.winner),
            scores: matches.map(match => match.score),
            teams: matches.map(match => ({ teamA: match.teamA, teamB: match.teamB }))
        };

        const response = await fetch('https://berlioz-cup.onrender.com/api/update-matchs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        const data = await response.json();

        if (data.status === 'ok') {
            alert('Matches updated');
            setMatches([initialMatchState]);
        }
    }

    return (
        <div className='update-match'>
            <form onSubmit={updateMatches}>
                {matches.map((match, matchIndex) => (
                    <div key={matchIndex}>
                        <input
                            type="text"
                            value={match.teamA}
                            onChange={(e) => handleMatchInputChange(matchIndex, 'teamA', e.target.value)}
                            placeholder="Team A"
                        />
                        <input
                            type="text"
                            value={match.teamB}
                            onChange={(e) => handleMatchInputChange(matchIndex, 'teamB', e.target.value)}
                            placeholder="Team B"
                        />
                        <input
                            type="text"
                            value={match.winner}
                            onChange={(e) => handleMatchInputChange(matchIndex, 'winner', e.target.value)}
                            placeholder="Winner"
                        />
                        <input
                            type="text"
                            value={match.score}
                            onChange={(e) => handleMatchInputChange(matchIndex, 'score', e.target.value)}
                            placeholder="Score"
                        />
                    </div>
                ))}
                <button type="button" onClick={addMatch}>
                    Add Match
                </button>
                <button type="submit">Update Matches</button>
            </form>
        </div>
    );
};

export default UpdateMatchs;
