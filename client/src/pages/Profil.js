import React, { useEffect, useState } from 'react';
import { GetUserData } from "./../api/getusers"
import { NavLink, useNavigate } from 'react-router-dom';

const Profil = () => {

    const [username, setUsername] = useState('')
	const [surname, setSurname] = useState('')
	const [name, setName] = useState('')
	const [classe, setClasse] = useState('')
    const [password, setPassword] = useState('')
    const [id, setId] = useState('')
    const history = useNavigate()

    useEffect(() => {
        GetUserData()
            .then(data => (setUsername(data.username), setSurname(data.surname), setName(data.name), setClasse(data.classe), setId(data._id)))
            .catch(error => alert(error.message))
    }, [])

    async function updateUser(event) {
        event.preventDefault()

        if (password) {
            const response = await fetch('http://localhost:1337/api/dashboard/profil', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
                id: id,
				surname: surname,
				name: name, 
				username: username,
                classe: classe,
				password: password, 
			}),
		    })

            const data = await response.json() 

		    if (data.status === 'ok') {
                localStorage.setItem('token', data.user)
                alert('les modifications ont été enregistrées')
			    history('/dashboard')
		    } else {
                console.log(data.error);
          }
        } else {
            const req = await fetch('http://localhost:1337/api/dashboard/profil', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
                id: id,
				surname: surname,
				name: name, 
				username: username,
                classe: classe,
			}),
		    })

            const data = await req.json() 

		    if (data.status === 'ok') {
                localStorage.setItem('refresh-token', data.user)
                alert('les modifications ont été enregistrées')
			    history('/dashboard')
		    } else {
                console.log(data.error);
          }
        }

	}
    

    return (
        <div>
            <NavLink to="/" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                <button>Retour</button>
        	</NavLink>
            {/* <h1>Profil</h1> */}
            <div className="form">
                <form action="" onSubmit={updateUser}>
                    <h1>Profil</h1>
                    <input type="text" placeholder={username} onChange={(e) => setUsername(e.target.value)} />
                    <input type="text" placeholder={surname} onChange={(e) => setSurname(e.target.value)}/>
                    <input type="text" placeholder={name} onChange={(e) => setName(e.target.value)}/>
                    <input type="text" placeholder={classe} onChange={(e) => setClasse(e.target.value)}/>
                    <input type="text" placeholder={password} onChange={(e) => setPassword(e.target.value)}/>
                    <input type="submit" value="Valider les changements" />
                </form>
            </div>
        </div>
    );
};

export default Profil;