import clientAxios from "@/utils/axios";

// Log In user
export async function LoginApi(data) {
    const result = await clientAxios.post('/user/login', data)
        .then(res => {
            return res
        })
        .catch(err => {
            return err
        })

    return result;
}

// Get Players
export async function getApiPlayers() {
    const result = clientAxios.get('/user', {
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
    const result = clientAxios.get(`/user/${id}`, {
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
    const result = clientAxios.post(`/user/changePw/${idUser}`, data, {
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
    const result = clientAxios.put(`/user/${id}`, data, {
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