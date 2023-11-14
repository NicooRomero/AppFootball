import clientAxios from "@/utils/axios";

// Get Teams
export async function getApiTeams() {
    const result = clientAxios.get('/team', {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            return response.data.response.listTeams
        })
        .catch(err => {
            return err
        })

    return result;
}

// Add new team
export async function addNewTeam(data) {
    const result = clientAxios.post('/team', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => {
        return res;
    })
    .catch(err => {
        return err;
    })

    return result;
}

// Add player to team
export async function addPlayerToTeam(data) {
    const result = clientAxios.post('/team/send-request', data,{
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

// Accept request to join team
export async function acceptJoinTeam(data) {
    const result = clientAxios.post('/team/accept-request', data,{
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

// Edit team
export async function editTeamApi(id, data) {
    const result = clientAxios.put(`/team/${id}`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => {
        return res;
    })
    .catch(err => {
        return err;
    })

    return result;
}