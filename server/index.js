const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const httpServer = require("http").createServer(app);

app.use(cors());
app.use(express.json());

const users = require('./Routes/users');
const paris = require('./Routes/paris')

mongoose.connect('mongodb+srv://jeremie:12345@database1.5jbub5s.mongodb.net/berlioz-tech');

// users.js requêtes
app.post('/api/register', users.createUser);
app.post('/api/login', users.loginUser);
app.get('/api/dashboard', users.getUserData);
app.get('/api/get-all-users', users.getAllUsers)
app.get('/api/get-all-users-tokens', users.getAllUsersTokens)
app.post('/api/dashboard/profil', users.updateUser)
app.post('/api/update-jetons', users.updateJetons)

// paris.js requêtes
app.post('/api/create-teams', paris.createTeams);
app.get('/api/get-all-matchs', paris.getAllMatchs)
app.get('/api/get-all-teams', paris.getAllTeams)
app.get('/api/get-match-data', paris.getMatchData)
app.post('/api/create-paris', paris.createParis)
app.get('/api/get-paris-data', paris.getParisData)

httpServer.listen(1337, () => {
  console.log('Server started on 1337'); 
});
