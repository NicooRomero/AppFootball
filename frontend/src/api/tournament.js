import clientAxios from "@/utils/axios";

// Get Tournament
export async function getApiTournament() {
    const result = clientAxios.get('/tournament', {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            return response.data.listTournaments
        })
        .catch(err => {
            return err
        })

    return result;
}

// Get tournament fixture
export async function getApiFixture(id) {
    const result = clientAxios.get(`/tournament/fixture/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            return response.data.matchDays
        })
        .catch(err => {
            return err
        })

    return result;
}

// Add new tournament
export async function addNewTournament(formData) {
    const result = await clientAxios.post('/tournament', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    .then(res => {
        return res
    })
    .catch(err => {
        return err
    })

    return result;
}

// Set new fixture
export async function setNewFixture(tournamentID) {
    const result = await clientAxios.post(`/tournament/fixture/${tournamentID}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => {
        return res
    })
    .catch(err => {
        return err
    })

    return result;
}

// Get Game
export async function getApiGame(tournamentId, gameId) {
    const result = clientAxios.get(`/tournament/${tournamentId}?gameId=${gameId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            return response.data.foundGame
        })
        .catch(err => {
            return err
        })

    return result;
}

// Update Game
export async function editApiGame(tournamentId, gameId, data) {
    const result = clientAxios.put(`/tournament/${tournamentId}?gameId=${gameId}`, data, {
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

// Reset teams values
export async function apiTeamsValuesReset() {
    const result = clientAxios.post('/tournament/teams/reset', {
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

// Delete tournament fixture
export async function apiDeleteFixture(tournamentId) {
    const result = clientAxios.put(`/tournament/delete/fixture/${tournamentId}`, {
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

// Delete tournament
export async function apiDeleteTournament(tournamentId) {
    const result = clientAxios.delete(`/tournament/${tournamentId}`, {
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