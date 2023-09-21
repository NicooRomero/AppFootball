const mongoose = require('mongoose');
const Tournament = require('../models/tournament');
const Team = require('../models/team');
const Player = require('../models/user');
const _ = require('lodash');


exports.getTournaments = async (req, res) => {

    let listTournaments = await Tournament.find().populate('organizer', 'email');

    if (!listTournaments) return res.status(404).send({ message: 'No hay torneos creados.' });

    const total = await Tournament.countDocuments();

    const response = {
        total,
        listTournaments
    }

    return res.status(200).send({ response });
}

exports.getFixture = async (req, res) => {

    let matches = await Tournament.findById(req.params.id).populate('teams', 'fixture');
    console.log(matches)
    // matches.fixture.forEach(pair => {
    //     let team1 = matches.teams.find(team => team._id.equals(pair[0]));
    //     let team2 = matches.teams.find(team => team._id.equals(pair[1]));

    //     console.log(`Match: ${team1.name} vs ${team2.name}`);
    // });
}

exports.addTournament = async (req, res) => {

    const tournamentData = req.body;
    const file = req.file;

    try {

        const player = await Player.findById(tournamentData.organizer);

        if (!player.organizer) return res.status(401).send({ message: 'Error, usted no esta autorizado para crear un nuevo torneo.' });

        const tournament = await new Tournament(tournamentData);

        if (file) {
            const fileName = req.file.filename;
            const folder = tournamentData.name
            const basePath = await `${req.protocol}://${req.get('host')}/public/uploads/tournaments/${folder}/`;
            tournament.image = await `${basePath}${fileName}`;
        }

        const teamIds = tournamentData.teams.split(','); //Dividir la cadena de ids
        const teamObjectIds = await teamIds.map(id => new mongoose.Types.ObjectId(id)); // convertir cada ID de equipo de formato de cadena a un objeto
        tournament.teams = teamObjectIds // Asignar al arreglo de objetos los ids

        tournament.save();

        return res.status(200).send({ message: 'El torneo fue creado con éxito.' });

    } catch (error) {
        console.log(error)
        res.status(500).send({ code: 500, message: "Error en el servidor, intente de nuevo más tarde." });
    }

}

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
                const match = [];

                for (let i = 0; i < matchesPerRound; i++) {
                    const home = arrayTeams[i];
                    const away = arrayTeams[arrayTeams.length - 1 - i];

                    if (matchDay > 0 && (matchDay % 2 === 0)) {
                        match.push({ home: away, away: home });
                    } else {
                        match.push({ home, away });
                    }
                }

                round.push(match);

                // Rotar equipos para la siguiente ronda
                arrayTeams.splice(1, 0, arrayTeams.pop());
            }

            return round;
        }

        const round = generarFixture(arrayTeams);

        round.forEach((round, indexRound) => {
            console.log(`Fecha ${indexRound + 1}:`);

            round.forEach((round, indexMatch) => {
                console.log(`${round.home.name} - ${round.away.name}`);
            });
        });

        await Tournament.findByIdAndUpdate(tournamentID, { fixture: round });

        return res.status(200).send({ round })

    } catch (error) {
        console.log(error)
        res.status(500).send({ code: 500, message: "Error en el servidor, intente de nuevo más tarde." });
    }


}

