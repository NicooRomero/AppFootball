import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2'
import toast from 'react-hot-toast';
import useAuth from '@/hooks/useAuth';
import { useUserContext } from '@/hooks/UserContext';
import { getApiNotifications, deleteApiInvitation } from '@/api/notifications';
import { acceptJoinTeam } from '@/api/teams';
import InvitationsCard from './InvitationsCard';
import RequestsCard from './RequestsCard';


export default function Notifications() {

    const { user } = useAuth();
    const { reload, setReload } = useUserContext();
    const [notifications, setNotifications] = useState();

    useEffect(() => {
        (async () => {
            const playerID = user?.id;
            if (playerID) {
                const response = await getApiNotifications(playerID)
                setNotifications(response);
            }
        })();
    }, [user, reload]);

    const onAccept = (invitation) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to accept this invitation?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, accept invitation!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const data = {
                    tLeaderID: invitation.sender._id,
                    playerID: invitation.recipient._id,
                    requestID: invitation._id
                }
                const response = await acceptJoinTeam(data)
                if (response.status === 200) {
                    Swal.fire(
                        'Accepted!',
                        `Now you are part of the team ${invitation.team.name}.`,
                        'success'
                    );
                } else {
                    response.response ? toast.error(response.response.data.message)
                        : toast.error('User canceled the operation.');
                }
                setReload(true);
            }
        })
        setReload(false);
    }

    const onDecline = async (idInvitation) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to decline this invitation?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, reject invitation!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await deleteApiInvitation(idInvitation)
                setReload(true);
                if (response.status === 200) {
                    Swal.fire(
                        'Rejected!',
                        'This invitation has been rejected.',
                        'success'
                    );
                } else {
                    response.response ? toast.error(response.response.data.message)
                        : toast.error('User canceled the operation.');
                }
            }
        })
        setReload(false);
    }

    return (
        <div>
            {notifications?.listInvitations ? <InvitationsCard notifications={notifications} onDecline={onDecline} onAccept={onAccept} /> : null}
            {notifications?.listRequests ?  <RequestsCard notifications={notifications} setReload={setReload} onDecline={onDecline} /> : null}
        </div>
    )
}
