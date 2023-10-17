const Team = require('../models/team');
const Player = require('../models/user');
const Request = require('../models/requests');
const Invitation = require('../models/invitations');


exports.getTeams = async (req, res) => {

    let listTeams = await Team.find().populate('teamLeader').populate('players');

    if (!listTeams) return res.status(404).send({ message: 'No hay equipos registrados' });

    const total = await Team.countDocuments();

    const response = {
        total,
        listTeams
    }

    return res.status(200).send({ response });
}

exports.getTeam = async (req, res) => {
    const params = req.params;

    try {

        let team = await Team.findById(params.id).populate('players');

        if (!team) return res.status(400).send({ message: 'Equipo no encontrado.' });

        return res.status(200).send({ team });

    } catch (error) {
        console.log(error)
        res.status(500).send({ code: 500, message: "Error en el servidor, intente de nuevo más tarde." });
    }
}

exports.addTeam = async (req, res) => {

    const teamData = req.body;
    const file = req.file;

    if (!teamData.name) return res.status(400).send({ message: 'Error! El nombre del equipo es obligatorio.' });

    try {

        const player = await Player.findById(teamData.teamLeader);

        if (!player.teamLeader) return res.status(401).send({ message: 'Usuario no autorizado para crear un equipo.' });

        if (player.team) return res.status(403).send({ message: 'Solo se puede crear un equipo por usuario.' });

        team = new Team(teamData)

        if (file) {
            const fileName = req.file.filename;
            const folder = teamData.teamLeader
            const basePath = await `${req.protocol}://${req.get('host')}/public/uploads/teams/${folder}/`;
            team.image = await `${basePath}${fileName}`;
        }

        await team.save();

        const playerData = player;

        playerData.team = team.id

        await Player.findByIdAndUpdate(player.id, playerData);

        return res.status(200).send({ message: 'Equipo creado correctamente.' });

    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Error en el servidor, intente de nuevo más tarde." });
    }
}

exports.addPlayerTeam = async (req, res) => {

    const { tLeaderID, playerID } = req.body;

    try {

        const leaderTeam = await Player.findById(tLeaderID).populate('team');
        const playerAdd = await Player.findById(playerID);
        const team = await Team.findById(leaderTeam.team).populate('players');

        if (!leaderTeam.teamLeader) return res.status(401).send({ message: 'Usuario no autorizado para agregar jugadores a un equipo.' });
        if (!playerAdd) return res.status(401).send({ message: 'Jugador no registrado/encontrado.' });
        if(playerAdd.teamLeader) return res.status(404).send({ message: 'Los jugadores propietarios de un equipo no pueden ser agregados a otros equipos.' });

        const existRequest = await Request.findOne({sender: tLeaderID, receiver: playerID})

        if(existRequest) return res.status(300).send({ message: 'Ya existe una solicitud pendiente para este jugador'})

        // Crear una solicitud en la base de datos
        const addRequest = new Request({
            sender: tLeaderID, // ID del usuario que envía la solicitud (asumiendo que el usuario está autenticado)
            receiver: playerID, // ID del usuario que se desea agregar
            status: 'pending', // Estado inicial de la solicitud (pendiente)
        });

        await addRequest.save();

        // Enviar una notificación al usuario que está siendo invitado
        const notification = new Invitation({
            recipient: playerID,
            sender: tLeaderID,
            team: team._id,
            message: 'you have a new request to join a team.',
        });

        await notification.save();

        return res.status(200).send({ message: `Se envio la solicitud para unirse al equipo a ${playerAdd.name} ${playerAdd.lastname}.` });

    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Error en el servidor, intente de nuevo más tarde." });
    }

}

exports.acceptJoinTeam = async (req, res) => {
    
    const { tLeaderID, playerID, requestID } = req.body;

    try {

        const leaderTeam = await Player.findById(tLeaderID).populate('team');
        const playerAdd = await Player.findById(playerID);
        const team = await Team.findById(leaderTeam.team).populate('players');

        let pUpdate = team.players;

        const index = pUpdate.findIndex(item => item.id === playerID);
        if (index !== -1) { //si id entonces index = indice (0,1,2) que es distinto a -1
            return res.status(409).send({ message: 'El jugador que intenta agregar, ya pertenece al equipo.' });
        } else if (playerAdd.team) {
            return res.status(409).send({ message: 'El jugador que intenta agregar, ya pertenece a un equipo.' });
        } else {

            pUpdate.push(playerAdd);

            team.players = pUpdate

            await Request.findOneAndUpdate({sender: tLeaderID, receiver: playerID}, {status: 'accepted'})

            await Team.findByIdAndUpdate(team.id, team);

            await Player.findByIdAndUpdate(playerID, { team: team.id });

            await Invitation.findByIdAndRemove(requestID);

            const teamPlayers = team.players;

            return res.status(200).send({ message: 'El jugador fue agregado al equipo.', teamPlayers });
        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Error en el servidor, intente de nuevo más tarde.' });
    }

}

exports.updateTeam = async (req, res) => {

    const teamData = req.body;
    const file = req.file;
    const params = req.params;

    try {

        team = await Team.findById(params.id)

        if (!team) return res.status(404).send({ message: 'Error! El equipo no existe.' });

        if (file) {
            const fileName = req.file.filename;
            const folder = team.teamLeader
            const basePath = await `${req.protocol}://${req.get('host')}/public/uploads/teams/${folder}/`;
            teamData.image = await `${basePath}${fileName}`;
        }
        console.log(teamData)
        let teamUpdate = await Team.findByIdAndUpdate(params.id, teamData);

        if (!teamUpdate) return res.status(400).send({ message: 'Error al actualizar datos del equipo.' });

        return res.status(200).send({ message: 'Datos del equipo actualizados correctamente.' });

    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Error en el servidor, intente de nuevo más tarde.' });
    }
}

exports.removePlayerTeam = async (req, res) => {

    const tLeader = req.body.teamLeader;
    const player = req.body.player;

    try {

        const teamLeader = await Player.findById(tLeader).populate('team');

        const playerID = await Player.findById(player);

        const team = await Team.findById(teamLeader.team).populate('players');

        let pUpdate = team.players;

        const index = pUpdate.findIndex(item => item.id === player);
        if (index === -1) { //si el id no existe en el arreglo index = -1
            return res.status(409).send({ message: 'El jugador que intenta remover, no pertenece al equipo.' });
        } else {
            const removePlayer = { $pull: { players: playerID._id } };

            await Team.updateOne({ _id: team._id }, removePlayer);

            await Player.updateOne({ _id: playerID._id }, { $unset: { team: '' } });

            return res.status(200).send({ message: 'El jugador fue removido del equipo.' });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Error en el servidor, intente de nuevo más tarde.' });
    }
}

exports.deleteTeam = async (req, res) => {
    const params = req.params;

    try {

        let team = Team.findByIdAndRemove(params.id);

        if (!team) return res.status(400).send({ message: 'El equipo que desea eliminar no existe.' });

        return res.status(200).send({ message: 'El equipo fue eliminado correctamente.' });

    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Error en el servidor, intente de nuevo más tarde.' });
    }
}