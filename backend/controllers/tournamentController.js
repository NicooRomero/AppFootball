const mongoose = require('mongoose');
const Tournament = require('../models/tournament');
const Team = require('../models/team');
const Match = require('../models/match');
const MatchDay = require('../models/matchDay');
const Player = require('../models/user');
const { v4: uuidv4 } = require('uuid');
const _ = require('lodash');


exports.getTournaments = async (req, res) => {

    let listTournaments = await Tournament.find().populate('teams').populate('lastChampion')

    if (listTournaments.totalDocs === 0) {
        return res.status(200).send( listTournaments.totalDocs );
    } else {
        return res.status(200).send({ listTournaments });

    }

}

exports.getFixture = async (req, res) => {

    const tournamentID = req.params.id;

    try {
        const tournament = await Tournament.findById(tournamentID).populate({
            path: 'fixture',
            populate: { path: 'matches' }
        });

        if (!tournament) {
            return res.status(404).send({ message: 'Tournament not found.' });
        }

        const matchDays = await MatchDay.find({ _id: { $in: tournament.fixture } }).populate('matches');

        // Obtener detalles de los equipos y agregarlos a los partidos
        for (const matchDay of matchDays) {
            for (const match of matchDay.matches) {
                const homeTeam = await Team.findById(match.home);
                const awayTeam = await Team.findById(match.away);

                match.home = homeTeam; // Reemplazar el ID con los detalles del equipo
                match.away = awayTeam; // Reemplazar el ID con los detalles del equipo
            }
        }

        return res.status(200).send({ matchDays });
    } catch (error) {
        console.log(error);
        res.status(500).send({ code: 500, message: 'Server error, please try again later.' });
    }
};

exports.addTournament = async (req, res) => {

    const { name, season, lastchampion, participants, image } = req.body;

    try {

        const teams = await Team.find({ _id: { $in: participants } });
        const desiredFields = 'name image';
        const champ = await Team.findById( lastchampion ).select(desiredFields);

        if (req.file) {
            const fileName = req.file.originalname;
            const folder = name
            const basePath = await `${req.protocol}://${req.get('host')}/public/uploads/tournaments/${folder}/`;
            let imagePath = await `${basePath}${fileName}`;
            
            const newTournament = new Tournament({
                name,
                season,
                teams,
                lastChampion: champ,
                image: imagePath
            });

            await newTournament.save();

            return res.status(200).send({ message: 'Tournament was created successfully.' });
        
        } else {
            const newTournament = new Tournament({
                name,
                season,
                teams,
                lastChampion: champ,
            });
       
            await newTournament.save();
    
            return res.status(200).send({ message: 'Tournament was created successfully.' });
        }
        

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating tournament' });
    }

}

// exports.setFixture = async (req, res) => {

//     const tournamentID = req.params.id;

//     try {

//         const tournament = await Tournament.findById(tournamentID).populate('teams');
//         const arrayTeams = tournament.teams;

//         function generarFixture(arrayTeams) {
//             const numRounds = arrayTeams.length - 1;
//             const matchesPerRound = arrayTeams.length / 2;

//             const round = [];

//             for (let matchDay = 0; matchDay < numRounds; matchDay++) {
//                 const match = [];

//                 for (let i = 0; i < matchesPerRound; i++) {
//                     const home = arrayTeams[i];
//                     const away = arrayTeams[arrayTeams.length - 1 - i];

//                     if (matchDay > 0 && (matchDay % 2 === 0)) {
//                         match.push({ id: uuidv4(), home: away, away: home, goalsH: '', goalsA: '', kickoff: '00:00', day: 'to confirm', stadium: '1' });
//                     } else {
//                         match.push({ id: uuidv4(), home, away, goalsH: '', goalsA: '', kickoff: '00:00', day: 'to confirm', stadium: '1'  });
//                     }
//                 }

//                 round.push(match);

//                 //Rotar equipos para la siguiente ronda
//                 arrayTeams.splice(1, 0, arrayTeams.pop());
//             }

//             return round;
//         }

//         const round = generarFixture(arrayTeams);

//         // round.forEach((round, indexRound) => {
//         //     console.log(`Fecha ${indexRound + 1}:`);

//         //     round.forEach((round, indexMatch) => {
//         //         console.log(`${round.home.name} - ${round.away.name}`);
//         //     });
//         // });

//         await Tournament.findByIdAndUpdate(tournamentID, { fixture: round });

//         return res.status(200).send({ message: 'Fixture was created successfully.' });

//     } catch (error) {
//         console.log(error)
//         res.status(500).send({ code: 500, message: "Server error, please try again later." });
//     }


// }

exports.setFixture = async (req, res) => {
    const tournamentID = req.params.id;

    try {
        const tournament = await Tournament.findById(tournamentID).populate('teams');
        const arrayTeams = tournament.teams;

        function generarFixture(arrayTeams) {
            const numRounds = arrayTeams.length - 1;
            const matchesPerRound = arrayTeams.length / 2;

            const round = [];

            for (let matchDay = 0; matchDay < numRounds; matchDay++) {
                const matches = [];

                for (let i = 0; i < matchesPerRound; i++) {
                    const home = arrayTeams[i];
                    const away = arrayTeams[arrayTeams.length - 1 - i];

                    if (matchDay > 0 && (matchDay % 2 === 0)) {
                        matches.push({ home: away, away: home, goalsH: '', goalsA: '', kickoff: '00:00', day: 'to confirm', stadium: '1' });
                    } else {
                        matches.push({ home, away, goalsH: '', goalsA: '', kickoff: '00:00', day: 'to confirm', stadium: '1' });
                    }
                }

                round.push(matches);

                // Rotar equipos para la siguiente ronda
                arrayTeams.splice(1, 0, arrayTeams.pop());
            }

            return round;
        }

        const round = generarFixture(arrayTeams);

        const matchDaysPromises = round.map(async (matches) => {
            const matchDayMatchesPromises = matches.map(async (match) => {
                const newMatch = new Match(match);
                return await newMatch.save();
            });

            const matchDayMatches = await Promise.all(matchDayMatchesPromises);

            const newMatchDay = new MatchDay({
                matches: matchDayMatches,
                date: new Date() // Puedes establecer la fecha del día de partido como desees
                // Otras propiedades relacionadas con el día de partido que desees almacenar
            });

            return await newMatchDay.save();
        });

        const matchDays = await Promise.all(matchDaysPromises);

        // Guardar los días de partido en el documento del Torneo
        await Tournament.findByIdAndUpdate(tournamentID, { fixture: matchDays });

        return res.status(200).send({ message: 'Fixture was created successfully.' });

    } catch (error) {
        console.log(error);
        res.status(500).send({ code: 500, message: 'Server error, please try again later.' });
    }
};

// exports.getGame = async (req, res) => {
//     const tournamentId = req.params.id
//     const gameId = req.query.gameId

//     try {

//     const tournament = await Tournament.findById(tournamentId);
//     const fixture = tournament.fixture;

//     let foundMatch = null;

//     // // Recorre el fixture para buscar el partido por su ID
//     for (let i = 0; i < fixture.length; i++) {
//       const matchesOfDay = fixture[i];
//       foundMatch = matchesOfDay.find((match) => match.id === gameId);

//       if (foundMatch) {
//         // Si se encuentra el partido, lo encontramos y salimos del bucle
//          break;
//        }
//      }

//      if (foundMatch) {
//         // Buscar los equipos 'home' y 'away' por sus IDs y obtener la información completa
//         
  
//         // Reemplazar los IDs con la información completa de los equipos
//         foundMatch.home = homeTeam;
//         foundMatch.away = awayTeam;
  
//         return res.status(200).json({ match: foundMatch });
//       } else {
//         return res.status(404).json({ message: 'Partido no encontrado' });
//       }
        
//     } catch (error) {
//         console.log(error)
//         res.status(500).send({ code: 500, message: "Server error, please try again later." });
//     }
// }

exports.getGame = async (req, res) => {
    const tournamentId = req.params.id;
    const gameId = req.query.gameId;

    try {
        const tournament = await Tournament.findById(tournamentId).populate({
            path: 'fixture',
            populate: {
                path: 'matches'
            }
        });
        if (!tournament) {
            return res.status(404).send({ message: 'Tournament not found.' });
        }
        
        const matchDays = await MatchDay.find({ _id: { $in: tournament.fixture } }).populate('matches');
        
        // Buscar el partido específico por gameId en todos los partidos de todos los días de partido
        let foundGame = null;
        for (const matchDay of matchDays) {
            foundGame = matchDay.matches.find(match => match._id.toString() === gameId);
            
            if (foundGame) {
                const homeTeam = await Team.findById(foundGame.home).select('name image');
                const awayTeam = await Team.findById(foundGame.away).select('name image');

                foundGame.home = homeTeam;
                foundGame.away = awayTeam;
                break;
            }
        }

        if (!foundGame) {
            return res.status(404).send({ message: 'Game not found.' });
        }

        return res.status(200).send({ foundGame });

    } catch (error) {
        console.log(error);
        res.status(500).send({ code: 500, message: 'Server error, please try again later.' });
    }
};

exports.updateGame = async (req, res) => {
    const gameId = req.query.gameId;
    const { newKickoff, newDay, newStadium, newGoalsH, newGoalsA } = req.body;
    
    try {

        let game = await Match.findById(gameId);

            if((newGoalsH !== '' && newGoalsH >= 0) && (newGoalsA !== '' && newGoalsA >= 0)) {
                if(newGoalsH > newGoalsA) {
                    // Increase and delete operations for the local team
                    await Team.findByIdAndUpdate(game.home._id, {
                        $inc: { points: 3, win: 1, goalsF: newGoalsH, goalsA: newGoalsA, matches: 1 },
                        $pop: { lastMatches: -1 }
                    });

                    // Add the new value for the local team
                    await Team.findByIdAndUpdate(game.home._id, {
                        $push: { lastMatches: { $each: [1], $position: 0 } }
                    });

                    // Increase and delete operations for the away team
                    await Team.findByIdAndUpdate(game.away._id, {
                        $inc: { lose: 1, goalsF: newGoalsA, goalsA: newGoalsH, matches: 1 },
                        $pop: { lastMatches: -1 }
                    });

                    // Add the new value for the away team
                    await Team.findByIdAndUpdate(game.away._id, {
                        $push: { lastMatches: { $each: [2], $position: 0 } }
                    });
                } else if(newGoalsH < newGoalsA) {
                    // Increase and delete operations for the local team
                    await Team.findByIdAndUpdate(game.home._id, {
                        $inc: { lose: 1, goalsF: newGoalsH, goalsA: newGoalsA, matches: 1 },
                        $pop: { lastMatches: -1 }
                    });

                    // Add the new value for the local team
                    await Team.findByIdAndUpdate(game.home._id, {
                        $push: { lastMatches: { $each: [2], $position: 0 } }
                    });

                    // Increase and delete operations for the away team
                    await Team.findByIdAndUpdate(game.away._id, {
                        $inc: { points: 3, win: 1, goalsF: newGoalsA, goalsA: newGoalsH, matches: 1 },
                        $pop: { lastMatches: -1 }
                    });

                    // Add the new value for the away team
                    await Team.findByIdAndUpdate(game.away._id, {
                        $push: { lastMatches: { $each: [1], $position: 0 } }
                    });
                } else {
                    // Increase and delete operations for the local team
                    await Team.findByIdAndUpdate(game.home._id, {
                        $inc: { points: 1, tie: 1, goalsF: newGoalsH, goalsA: newGoalsA, matches: 1 },
                        $pop: { lastMatches: -1 }
                    });

                    // Add the new value for the local team
                    await Team.findByIdAndUpdate(game.home._id, {
                        $push: { lastMatches: { $each: [0], $position: 0 } }
                    });

                    // Increase and delete operations for the away team
                    await Team.findByIdAndUpdate(game.away._id, {
                        $inc: { points: 1, tie: 1, goalsF: newGoalsA, goalsA: newGoalsH, matches: 1 },
                        $pop: { lastMatches: -1 }
                    });

                    // Add the new value for the away team
                    await Team.findByIdAndUpdate(game.away._id, {
                        $push: { lastMatches: { $each: [0], $position: 0 } }
                    });
                }

                const updatedGame = await Match.findByIdAndUpdate(gameId, {
                    kickoff: newKickoff,
                    day: newDay,
                    stadium: newStadium,
                    goalsH: newGoalsH,
                    goalsA: newGoalsA
                }, { new: true });

                if (!updatedGame) {
                    return res.status(404).send({ message: 'Game not found.' });
                }

                return res.status(200).send({ message: 'Game updated successfully.' });
                
            }

        const updatedGame = await Match.findByIdAndUpdate(gameId, {
            kickoff: newKickoff,
            day: newDay,
            stadium: newStadium,
        }, { new: true });

        if (!updatedGame) {
            return res.status(404).send({ message: 'Game not found.' });
        }

        return res.status(200).send({ message: 'Game updated successfully.' });

    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: 'Internal server error' });
    }
};

exports.resetTeamsValues = async (req, res) => {
    try {
        let listTeams = await Team.find();

        for (let i = 0; i < listTeams.length; i++) {
            let teamId = listTeams[i]._id;

            await Team.findByIdAndUpdate(teamId, {
                $set: {
                    points: 0,
                    win: 0,
                    lose: 0,
                    tie: 0,
                    matches: 0,
                    goalsF: 0,
                    goalsA: 0,
                    lastMatches: []
                }
            });
        }

        res.status(200).send({ message: 'Teams values reset successful.' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ code: 500, message: 'Server error, please try again later.' });
    }
};

exports.deleteFixture = async (req, res) => {

    const tournamentId = req.params.id;

    try {

        const tournament = await Tournament.findByIdAndUpdate(tournamentId, {
            $set: {
                fixture: []
            }
        })

        if(!tournament) return res.status(404).send({ message: 'Tournament not found.' });

        res.status(200).send({ message: 'Fixture was deleted succesfully' })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({ code: 500, message: 'Server error, please try again later.' });
    }
}

exports.deleteTournament = async (req, res) => {

    const tournamentId = req.params.id;
    
    try {

        const tournament = await Tournament.findByIdAndRemove(tournamentId)

        if(!tournament) return res.status(404).send({ message: 'Tournament not found.' });

        res.status(200).send({ message: 'Torunament was deleted succesfully' })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({ code: 500, message: 'Server error, please try again later.' });
    }

}