import React from 'react';
import { useState, useEffect } from 'react'
import Naviguation from "../components/Naviguation";
import { NavLink, useNavigate } from 'react-router-dom';

function App() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const naviguate = useNavigate()

	async function loginUser(event) {
		event.preventDefault()

		const response = await fetch('http://localhost:1337/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username,
				password,
			}),
		})

		const data = await response.json()

		if (data.user) {
			localStorage.setItem('token', data.user)
			alert('Login successful')
			window.location.href = '/dashboard'
		} else {
			alert('Please check your username and password')
		}
	}

	useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            naviguate('/dashboard')
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
			<form onSubmit={loginUser}>
				<h1>Login</h1>
				<input
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					type="username"
					placeholder="username"
				/>
				<br />
				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					placeholder="Password"
				/>
				<br />
				<input type="submit" value="Login" />
			</form>
			</div>
		</div>
	)
}

export default App