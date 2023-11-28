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
        res.status(500).send({ code: 500, message: "Server error, please try again later." });
    }
}

exports.addTeam = async (req, res) => {

    const teamData = req.body;
    
    try {

        if (!teamData.name) return res.status(400).send({ message: 'Error! Team name is required.' });

        const newTeam = {
            'name': teamData.name,
            'teamLeader': teamData.teamLeader,
            'social.instagram': teamData.instagram,
            'social.facebook': teamData.facebook,
            'social.twitter': teamData.twitter
        }   

        const player = await Player.findById(teamData.teamLeader);

        if (player.team) return res.status(403).send({ message: 'Only one team can be created per user.' });

        team = new Team(newTeam);

        let arrayPlayers = team.players;  

        arrayPlayers.push(player);

        team.players = await arrayPlayers;

        await team.save();

        const playerData = player;

        playerData.team = team.id;
        playerData.teamLeader = true;

        await Player.findByIdAndUpdate(player.id, playerData);

        return res.status(200).send({ message: 'Successfully created team.' });

    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Server error, please try again later." });
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
        return res.status(500).send({ code: 500, message: "Server error, please try again later." });
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
        return res.status(500).send({ message: 'Server error, please try again later.' });
    }

}

exports.updateTeam = async (req, res) => {

    const teamData = req.body;
    const params = req.params;

    try {

        let updateData = {
            'name': teamData.name,
            'social.instagram': teamData.instagram,
            'social.facebook': teamData.facebook,
            'social.twitter': teamData.twitter
        }

        team = await Team.findById(params.id)

        if (!team) return res.status(404).send({ message: 'Error! team does not exist.' });
        
        let teamUpdate = await Team.findByIdAndUpdate(params.id, updateData);

        if (!teamUpdate) return res.status(400).send({ message: 'Error updating team data.' });

        return res.status(200).send({ message: 'Team data updated correctly.' });

    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Server error, please try again later.' });
    }
}

exports.uploadTeamImg = async (req, res) => {
    
    const params = req.params;
    const file = req.file;

    try {
        let updateTeam;

        updateTeam = await Team.findById(params.id);

        if (!updateTeam) return res.status(404).send({ message: 'Team does not exist.' });

        if (!file) return res.status(400).send({ message: 'Please you must choose an image file' })

        const fileName = req.file.filename;
        const folder = updateTeam.id
        const basePath = await `${req.protocol}://${req.get('host')}/public/uploads/teams/${folder}/`;
        updateTeam.image = await `${basePath}${fileName}`;

        await Team.findByIdAndUpdate(params.id, updateTeam);

        return res.status(200).send({ message: 'Image updated successfully.' });

    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Server error, please try again later.' });
    }

}

exports.removePlayerTeam = async (req, res) => {
    
    const tLeader = req.query.tLeaderId;
    const player = req.params.id;

    try {

        const teamLeader = await Player.findById(tLeader).populate('team');

        const playerID = await Player.findById(player);

        const team = await Team.findById(teamLeader.team).populate('players');

        let pUpdate = team.players;

        const index = pUpdate.findIndex(item => item.id === player);
        if (index === -1) { //si el id no existe en el arreglo index = -1
            return res.status(409).send({ message: 'The player trying to remove does not belong to the team.' });
        } else {
            const removePlayer = { $pull: { players: playerID._id } };

            await Team.updateOne({ _id: team._id }, removePlayer);

            await Player.updateOne({ _id: playerID._id }, { $unset: { team: '' } });

            return res.status(200).send({ message: 'The player was removed from the team.' });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Server error, please try again later.' });
    }
}

exports.deleteTeam = async (req, res) => {

    try {

        const userId = req.query.userId;
        const teamId = req.params.id;

        const user = await Player.findById(userId).select('isAdmin');
        const admin = user.isAdmin;
        const teamDelete = await Team.findById(teamId);

        if (!teamDelete) return res.status(404).send({ message: 'Team not found.' });

        // Check if the user making the request is the team leader.
        if (teamDelete.teamLeader.includes(userId) || admin) {
            
            for (const playerId of teamDelete.players) {
                let removeTeamPlayer = await Player.findById(playerId);
                if (removeTeamPlayer) {
                    await removeTeamPlayer.updateOne({ $unset: { team: 1 }, teamLeader: false });
                }
            }

            // Delete team after update players team
            await Team.findByIdAndRemove(teamId);
            
        } else {
            return res.status(403).send({ message: 'You do not have permissions to delete this team.' });
        }
        
        return res.status(200).send({ message: 'Team removed successfully.' })

    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Server error, please try again later.' });
    }
}

// exports.deleteTeam = async (req, res) => {
//     try {
//         const userId = req.query.userId;
//         const teamId = req.params.id;

//         const user = await Player.findById(userId).select('isAdmin');
//         const admin = user.isAdmin;
//         const teamDelete = await Team.findById(teamId);

//         if (!teamDelete) return res.status(404).send({ message: 'Team not found.' });

//         // Check if the user making the request is the team leader.
//         if (teamDelete.teamLeader.includes(userId) || admin) {
//             for (const playerId of teamDelete.players) {
//                 let removeTeamPlayer = await Player.findById(playerId);
//                 if (removeTeamPlayer) {
//                     await removeTeamPlayer.updateOne({ $unset: { team: 1 }, teamLeader: false });
//                 }
//             }

//             // Delete team after updating players' team
//             await Team.findByIdAndRemove(teamId);

//             // Eliminar la imagen y la carpeta asociada al equipo
//             const imagePath = path.join(__dirname, '../public/uploads/teams', teamDelete.folder, 'nombre_archivo_imagen.extensión');
//             if (fs.existsSync(imagePath)) {
//                 fs.unlinkSync(imagePath);
//                 console.log('Imagen eliminada correctamente');
                
//                 const teamFolderPath = path.join(__dirname, '../public/uploads/teams', teamDelete.folder);
//                 if (fs.existsSync(teamFolderPath)) {
//                     fs.rmdirSync(teamFolderPath, { recursive: true });
//                     console.log('Carpeta del equipo eliminada correctamente');
//                 }
//             } else {
//                 console.log('La imagen no existe o ya ha sido eliminada');
//             }

//             return res.status(200).send({ message: 'Team removed successfully.' });
//         } else {
//             return res.status(403).send({ message: 'You do not have permissions to delete this team.' });
//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(500).send({ message: 'Server error, please try again later.' });
//     }
// };