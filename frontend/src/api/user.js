import clientAxios from "@/utils/axios";

// Add player
export async function addUserApi(data) {
    const result = await clientAxios.post('/user', data)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            return err;
        })
    return result;
}

// Log In user
export async function LoginApi(data) {
    const result = await clientAxios.post('/user/login', data)
        .then(res => {
            return res
        })
        .catch(err => {
            return err.response.data.message
        })

    return result;
}

// Get Players
export async function getApiPlayers() {
    const result = await clientAxios.get('/user', {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            return response.data.listPlayers
        })
        .catch(err => {
            return err
        })

    return result;
}

// Get Player
export async function getApiPlayer(id) {
    const result = await clientAxios.get(`/user/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            return response.data.player
        })
        .catch(err => {
            return err
        })

    return result;
}

// Change Password
export async function changePassword(idUser, data) {
    const result = await clientAxios.post(`/user/changePw/${idUser}`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            return response
        })
        .catch(err => {
            return err.response.data
        })

    return result;
}

// Edit Player
export async function editApiPlayer(id, data) {
    const result = await clientAxios.put(`/user/${id}`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.log(err);
            return err
        })

    return result;
}

// Upload Avatar
export async function uploadAvatarApi(id, formData ) {
    const result = await clientAxios.put(`/user/upload/avatar/${id}`, formData, {
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

// Set status
export async function setStatusApi(id, data) {
    const result = await clientAxios.put(`/user/status/${id}`, data, {
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

// Delete player
export async function deleteApiPlayer(id) {
    const result = await clientAxios.delete(`/user/${id}`, {
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

// Leave team
export async function leaveTeamApi(id) {
    const result = await clientAxios.patch(`/user/leave-team/${id}`, {
        header: {
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

// Total count
export async function getApiTotalCount() {
    const result = await clientAxios.get('/user/count', {
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