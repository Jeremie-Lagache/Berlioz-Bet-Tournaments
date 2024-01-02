import React from 'react';

const Matchs = ({sport, teams, tour, cotes, state, score, handleMatch }) => {
    return (
        <div className='match-card'>
            <div className="match-info">
                <h2>{sport}</h2>
                <p>Tour: {tour}</p>
                <p>{teams[0]} VS {teams[1]}</p>
                <p>Côtes: {cotes[0]} VS {cotes[1]}</p>
                <p>Status: {state}</p>
            </div>
            {state === "fini" && score && <div className='score'>Score : {score[0]}-{score[1]}</div>}
            {state !== "fini" && score !== undefined && <button className="bet-button" onClick={handleMatch}>Parier sur ce Match</button>}
        </div>
    );
};

export default Matchs;