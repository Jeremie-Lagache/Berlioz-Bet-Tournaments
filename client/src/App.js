import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Profil from './pages/Profil'
import Stats from './pages/Stats'
import Classement from './pages/Classement'
import Parier from './pages/Parier'
import Match from './pages/Match'

const App = () => {
	return (
		<div>
			<BrowserRouter>
				<Routes> 
					<Route path='/' element={<Dashboard />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/dashboard/profil" element={<Profil />} />
					<Route path="/dashboard/stats" element={<Stats />} />
					<Route path="/dashboard/classement" element={<Classement />} />
					<Route path="/dashboard/parier" element={<Parier />} />
					<Route path="/matchs/:id" element={<Match />} />
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App