import React from 'react';
import { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Naviguation from "../components/Naviguation";

function App() {
	const history = useNavigate()

	const [surname, setSurname] = useState('')
	const [name, setName] = useState('')
	const [username, setUsername] = useState('')
	const [classe, setClasse] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState(false)

	async function registerUser(event) {
		event.preventDefault()

		const response = await fetch('http://localhost:1337/api/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				surname,
				name, 
				username,
				classe,
				password, 
			}),
		})

		const data = await response.json() 

		if (data.status === 'ok') {
			history('/login')
		} else {
			setError(true)
		}
	}

	useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            history('/dashboard')
        }
    }, [])

	return (
		<div>
			<div className="register-login-nav-bar">
				<NavLink to="/" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                <img src="img/logo.png" alt="logo" />
        		</NavLink>
				<div className="register-login-naviguation">
					<Naviguation />
				</div>
			</div>
			<div className="form">
			<form onSubmit={registerUser}>
			<h1>Register</h1>
			<input
					value={surname}
					onChange={(e) => setSurname(e.target.value)}
					type="surname"
					placeholder="surname"
				/>
				<br />
				<input
					value={name}
					onChange={(e) => setName(e.target.value)}
					type="name"
					placeholder="name"
				/>
				<br />
				<input
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					type="username"
					placeholder="username"
				/>
				<br />
				<input
					value={classe}
					onChange={(e) => setClasse(e.target.value)}
					type="classe"
					placeholder="classe"
				/>
				<br />
				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					placeholder="Password"
				/>
				<br />
				{error && <p style={{color: 'red'}}>Ce nom d'utilisateur est déjà pris</p>}
				<input type="submit" value="Register" />
			</form>
			</div>
		</div>
	)
}

export default App