import React, { useState } from 'react';

const Upload = () => {
    const initialTeamState = { classe: '', players: [{ name: '', cote: 0 }] };
    const [teams, setTeams] = useState([initialTeamState]);

    const handleInputChange = (index, field, value) => {
        const updatedTeams = [...teams];
        updatedTeams[index][field] = value;
        setTeams(updatedTeams);
    };

    const handlePlayerChange = (teamIndex, playerIndex, field, value) => {
        const updatedTeams = [...teams];
        updatedTeams[teamIndex].players = updatedTeams[teamIndex].players || [];
        updatedTeams[teamIndex].players[playerIndex] = updatedTeams[teamIndex].players[playerIndex] || { name: '', cote: 0 };
        updatedTeams[teamIndex].players[playerIndex][field] = value;
        setTeams(updatedTeams);
    };

    const addTeam = () => {
        setTeams([...teams, initialTeamState]);
    };

    async function createTeams(event) {
        event.preventDefault();

        const response = await fetch('https://berlioz-cup.onrender.com/api/create-teams', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                teams,
            }),
        });

        const data = await response.json();

        if (data.status === 'ok') {
            alert('Teams created');
            setTeams([initialTeamState]);
        }
    }

    return (
        <div className='upload'>
            <form onSubmit={createTeams}>
                {teams.map((team, teamIndex) => (
                    <div key={teamIndex}>
                        <input
                            type="text"
                            value={team.classe}
                            onChange={(e) => handleInputChange(teamIndex, 'classe', e.target.value)}
                            placeholder="Class"
                        />
                        {team.players.map((player, playerIndex) => (
                            <div key={playerIndex}>
                                <input
                                    type="text"
                                    value={player.name}
                                    onChange={(e) =>
                                        handlePlayerChange(teamIndex, playerIndex, 'name', e.target.value)
                                    }
                                    placeholder={`Player ${playerIndex + 1} name`}
                                />
                                <input
                                    type="number"
                                    step="0.01"
                                    value={player.cote}
                                    onChange={(e) =>
                                        handlePlayerChange(teamIndex, playerIndex, 'cote', parseFloat(e.target.value))
                                    }
                                    placeholder={`Player ${playerIndex + 1} cote`}
                                />
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() =>
                                handlePlayerChange(teamIndex, team.players.length, 'name', '')
                            }
                        >
                            Add Player
                        </button>
                    </div>
                ))}
                <button type="button" onClick={addTeam}>
                    Add Team
                </button>
                <button type="submit">Create teams</button>
            </form>
        </div>
    );
};

export default Upload;
