import React from 'react';
import { useState, useEffect } from 'react'
import Naviguation from "../components/Naviguation";
import { NavLink, useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners'; 

function App() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const naviguate = useNavigate()

	async function loginUser(event) {
		event.preventDefault()
		setIsLoading(true)

		const response = await fetch('https://berlioz-cup.onrender.com/api/login', {
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
				<input 
					type="submit" 
					value="Login" 
					disabled={isLoading}
				/>
				{isLoading && (
                            <div className="loader-overlay">
                                <BeatLoader color={'blue'} loading={isLoading} size={10} />
                            </div>
                        )}
			</form>
			</div>
		</div>
	)
}

export default App