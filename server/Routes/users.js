const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Fonction pour créer un utilisateur
exports.createUser = async (req, res) => {
  console.log(req.body);
  try {
    const newPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      surname: req.body.surname,
      name: req.body.name,
      username: req.body.username,
      classe: req.body.classe,
      tokens: 1000,
      password: newPassword,
    });
    res.json({ status: 'ok' });
  } catch (err) {
    res.json({ status: 'error', error: err });
  }
};

// Fonction pour gérer la connexion d'un utilisateur
exports.loginUser = async (req, res) => {
  const user = await User.findOne({
    username: req.body.username,
  });

  if (!user) {
    return { status: 'error', error: 'Invalid login' }; 
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (isPasswordValid) {
    const token = jwt.sign(
      {
        username: user.username,
        surname: user.surname,
      },
      'secret123'
    );

    return res.json({ status: 'ok', user: token });
  } else {
    return res.json({ status: 'error', user: false });
  }
};

// Fonction pour obtenir user

exports.getUserData = async (req, res) => {
  const token = req.headers['x-access-token'];
  const refreshToken = req.headers['x-refresh-token'];

  if(refreshToken.length > 50) {
    
    try {
      const decoded = jwt.verify(refreshToken, 'refreshsecret123');
      const username = decoded.username;
      const user = await User.findOne({ username: username });
  
      return res.json({ status: 'ok', user: user });
    } catch (error) {
      console.log(error);
      res.json({ status: 'error', error: error });
    }

  } else {

    try {
      const decoded = jwt.verify(token, 'secret123');
      const username = decoded.username;
      const user = await User.findOne({ username: username });
  
      return res.json({ status: 'ok', user: user });
    } catch (error) {
      console.log(error);
      res.json({ status: 'error', error: error });
    }
  }
};

exports.getAllUsersTokens = async (req, res) => {
  try {
    const users = await User.find();
    let users_data = [];

    for (const user of users) {
      let user_data = {
        surname: user.surname,
        name: user.name,
        tokens: user.tokens
      };
      users_data.push(user_data);
      console.log(user_data);
      console.log(users_data);
    }

    return res.json({ status: 'ok', users_data: users_data });
  } catch (error) {
    console.log(error);
    res.json({ status: 'error', error: error });
  }
};


// Fonction pour mettre à jour user
exports.updateUser = async (req, res) => {

  try {
    if (req.body.password) {
      const newPassword = await bcrypt.hash(req.body.password, 10);
      const user = await User.findOneAndUpdate(
        { _id: req.body.id },
        { $set: { username: req.body.username, surname: req.body.surname, name: req.body.name, classe: req.body.classe ,password: newPassword } },
        { new: true }
      );

      const token = jwt.sign(
        {
          username: user.username,
          surname: user.surname,
        },
        'refreshsecret123'
      );

      return res.json({ status: 'ok', user : token});
    } else {
      const user = await User.findOneAndUpdate(
        { _id: req.body.id },
        { $set: { username: req.body.username, surname: req.body.surname, name: req.body.name, classe: req.body.classe } },
        { new: true }
      );


      if (user) {
        const token = jwt.sign(
          {
            username: user.username,
            surname: user.surname,
          },
          'refreshsecret123'
        );

        return res.json({ status: 'ok', user : token });
      }

    }
    
  } catch (error) {
    console.log(error);
    res.json({ status: 'error', error: error });
  }
};

exports.getAllUsers = async (req, res) => {
  const token = req.headers['x-access-token'];
  const refreshToken = req.headers['x-refresh-token'];

  if(refreshToken.length > 50) {
    
    try {
      const decoded = jwt.verify(refreshToken, 'refreshsecret123');
      const users = await User.find();
  
      return res.json({ status: 'ok', users: users });
    } catch (error) {
      console.log(error);
      res.json({ status: 'error', error: error });
    }

  } else {

    try {
      const decoded = jwt.verify(token, 'secret123');
      const users = await User.find();
  
      return res.json({ status: 'ok', users: users });
    } catch (error) {
      console.log(error);
      res.json({ status: 'error', error: error });
    }
  }
  
};

exports.updateJetons = async (req, res) => {
  const jetons = req.body.jetons;
  const id = req.body.id;
  
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ status: 'error', error: 'User not found' });
    }

    const tokens = user.tokens;
    const updatedTokens = tokens - jetons;

    await User.findByIdAndUpdate(
      id,
      { $set: { tokens: updatedTokens } },
      { new: true }
    );

    res.json({ status: 'ok' });
  } catch (err) {
    res.status(500).json({ status: 'error', error: err.message });
  }
};
