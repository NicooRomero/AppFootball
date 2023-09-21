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

// Add player to team
export async function addPlayerToTeam(data) {
    const result = clientAxios.post('/team/add-player', data,{
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        console.log(response);
        return response
    })
    .catch(err => {
        console.log(err);
        return err
    })

    return result;
}