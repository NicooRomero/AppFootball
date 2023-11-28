import clientAxios from "@/utils/axios";

// Get Tournament
export async function getApiTournament() {
    const result = clientAxios.get('/tournament', {
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