import clientAxios from "@/utils/axios";

// Get Invitations per user
export async function getApiNotifications(playerID) {
    const result = clientAxios.get(`/notifications/${playerID}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            return response.data
        })
        .catch(err => {
            return err
        })

    return result;
}

// Delete notification
export async function deleteApiNotification(idRequest) {
    const result = clientAxios.delete(`/notifications/${idRequest}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            return response
        })
        .catch(err => {
            return err
        })

    return result;
}

// Decline invitation request
export async function deleteApiInvitation(idInvitation) {
    const result = clientAxios.delete(`/notifications/${idInvitation}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            return response
        })
        .catch(err => {
            return err
        })

    return result;
}