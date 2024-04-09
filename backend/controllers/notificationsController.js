const Invitation = require('../models/invitations');
const Requests = require('../models/requests');

exports.getNotifications = async (req, res) => {
    const { id } = req.params;

    try {

        let listInvitations = await Invitation.find({recipient: id}).populate('recipient','name').populate('sender', 'name image').populate('team', 'name');

        let listRequests = await Requests.find({sender: id}).populate('receiver','name image').populate('sender', 'name');
        
        if(!listInvitations || !listRequests) return res.status(400).send({ message: 'No tienes notificaciones.' });

        return res.status(200).send({ listInvitations, listRequests });
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Error en el servidor, intente de nuevo más tarde.' });
    }
}

exports.deleteInvitation = async (req, res) => {
    const { id } = req.params;
    
    try {
        
        let deleteInvitation = await Invitation.findByIdAndDelete(id);
        let deleteRequest = await Requests.findByIdAndDelete(id);
        
        if(!deleteInvitation && !deleteRequest) return res.status(400).send({ message: 'this invitation does not exist' });

        if(deleteInvitation) {
            await Request.findOneAndUpdate({sender: tLeaderID, receiver: playerID}, {status: 'rejected'});
        }

        return res.status(200).send({ message: 'Notification succesfully deleted.' });
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Error en el servidor, intente de nuevo más tarde.' });
    }
}