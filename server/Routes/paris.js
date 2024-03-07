const Pari = require('../models/paris.model');
const Match = require('../models/matchs.model');
const Team = require('../models/team.model');

exports.createParis = async (req, res) => {
  const pari = req.body;
  const index = pari.index;
  try {
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

    const cotesCount = match.counts.reduce((acc, count) => acc + (isNaN(count) ? 0 : count), 0);

    const updateQuery = {};
    const countQuery = {};

    match.counts.forEach((count, i) => {
      const update = Math.trunc((count + 1) / (cotesCount + 1) * 100);
      updateQuery[`cotes.${i}`] = update;
      countQuery[`counts.${i}`] = count + 1;
    });

    await Match.updateOne(
      { _id: pari.match },
      { $set: { ...updateQuery, ...countQuery } }
    );

    res.json({ status: 'ok' });

  } catch (err) {
    res.json({ status: 'error', error: err });
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






  