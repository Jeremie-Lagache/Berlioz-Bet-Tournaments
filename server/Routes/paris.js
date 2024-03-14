const Pari = require('../models/paris.model');
const Match = require('../models/matchs.model');
const Team = require('../models/team.model');

exports.createParis = async (req, res) => {
  const pari = req.body;
  const index = pari.index;
  try {
    const oldPari = Pari.findOne({parieur : pari.parieur, match : pari.match})
    console.log(oldPari)
    if (oldPari === NaN) {
      await Pari.create({
        sport: pari.sport,
        match: pari.match,
        parieur: pari.parieur,
        cote: pari.cote,
        team: pari.team,
        jetons: pari.jetons,
        state: pari.state,
        result: pari.result,
      });

      const match = await Match.findOne({ _id: pari.match });
  
      const cotesCount = match.counts.reduce((acc, count) => acc + count, 0);
  
      let update = 100 - Math.trunc(((match.counts[index] + 1) / (cotesCount + 1)) * 100)
  
      const updateQuery = {};
      updateQuery['cotes.' + index] = update;
      const countquery = {};
      countquery['counts.' + index] = match.counts[index] + 1;
  
      await Match.updateOne(
        { _id: pari.match },
        { $set: { ...updateQuery, ...countquery } }
      );
  
      res.json({ status: 'ok' });

    } catch (err) {
      res.json({ status: 'error', error: err });
      console.log(err)
    }
  }
};

    
  exports.getAllMatchs = async (req, res) => {
      
      try {
        const matchs = await Match.find()
        return res.json({ status: 'ok', matchs: matchs });
      } catch (error) {
        console.log(error);
        res.json({ status: 'error', error: error });
      }
    
  }

  exports.getAllTeams = async (req, res) => {
      
    try {
      const teams = await Team.find()
      return res.json({ status: 'ok', teams: teams });
    } catch (error) {
      console.log(error);
      res.json({ status: 'error', error: error });
    }
  
  }

  exports.getMatchData = async (req, res) => {

    const id = req.headers['id'];
      
    try {
      const match = await Match.findOne({_id : id})
      return res.json({ status: 'ok', match: match });
    } catch (error) {
      console.log(error);
      res.json({ status: 'error', error: error });
    }
  
}

exports.updateMatches = async (req, res) => {
  const score = req.body.score
  const teams = req.body.teams;
  const winner = req.body.winner

  try {
    await Match.updateOne(
      {teams : teams}, 
      {$set : {
        winner : winner,
        score : score,
        state : "fini"
      }})
    res.json({ status: 'ok' });
  } catch (err) {
    res.json({ status: 'error', error: err });
  }
};

exports.createTeams = async (req, res) => {
  const teams = req.body.teams
  try {
    teams.forEach(async team => {
      if (team.classe && team.players) {
        await Team.create({
          classe : team.classe,
          players : team.players
        });
      }
    })
    res.json({ status: 'ok' });
  } catch (err) {
    res.json({ status: 'error', error: err });
  }
};

exports.createMatches = async (req, res) => {
  const matches = req.body.matches;

  try {
    matches.forEach(async (match) => {
      if (
        match.sport &&
        match.teams &&
        match.tour &&
        match.date
      ) {
        await Match.create({
          sport: match.sport,
          teams: match.teams,
          tour: match.tour,
          date: match.date,
          cotes: [100, 100, 100],
          counts: [0, 0, 0],
          state: "bientôt",
        });
      }
    });
    res.json({ status: 'ok' });
  } catch (err) {
    res.json({ status: 'error', error: err });
  }
};

exports.GetParisData = async (req, res) => {

  const id = req.headers['id'];
    
  try {
    const paris = await Pari.find({parieur : id})
    return res.json({ status: 'ok', paris: paris });
  } catch (error) {
    console.log(error);
    res.json({ status: 'error', error: error });
  }

}

exports.GetCotesData = async (req, res) => {

  const id = req.headers['id'];
    
  try {
    const match = await Match.findOne({_id : id})
    return res.json({ status: 'ok', cotes: match.cotes });
  } catch (error) {
    console.log(error);
    res.json({ status: 'error', error: error });
  }

}

exports.UpdateParis = async (req, res) => {
  const id = req.body.id
  const result = req.body.result
  try {
    await Pari.updateOne({match : id}, { $set : {result : result}})
  } catch(error) {
    console.log(error);
    res.json({ status: 'error', error: error });
  }
}




  
