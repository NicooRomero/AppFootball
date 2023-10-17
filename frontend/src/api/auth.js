import { ACCESS_TOKEN, REFRESH_TOKEN } from '../utils/const';
import jwtDecode from 'jwt-decode';

const baseURL = 'http://localhost:4000/api/v1/';

export function getAccToken() {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);

    if(accessToken) {
        const expired = willExpireToken(accessToken);
        console.log(expired);
        if(!expired) {
            return accessToken;
        }
    } else {
        return;
    }
    // if(!accessToken || accessToken === 'null') {
    //     return;
    // }

    //return willExpireToken(accessToken) ? null : accessToken;
}

export function getRefToken() {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    
    if(refreshToken) {
        const expired = willExpireToken(refreshToken);
        console.log(expired);
        if(!expired) {
            return refreshToken;
        }

    } else {
        return;
    }

    // if(!refreshToken || refreshToken === 'null') {
    //     return;
    // }

    //return willExpireToken(refreshToken) ? null : refreshToken;
}

export function refreshAccessToken(refreshToken) {
    const url = `${baseURL}/auth/refresh-access-token`;

    const bodyObj = {
        refreshToken: refreshToken
    }

    const params = {
        method: 'POST',
        body: JSON.stringify(bodyObj),
        headers: {
            "Content-Type": "application/json"
        }
    };

    return fetch(url, params)
        .then(response => {
            if (response.status !== 200) {
                throw new Error("Error al refrescar el token");
            }
            return response.json();
        })
        .then(result => {
            if (!result || !result.accessToken) {
                throw new Error("Token de acceso no válido");
            } else {
                const { accessToken, refreshToken } = result;
                localStorage.setItem(ACCESS_TOKEN, accessToken);
                localStorage.setItem(REFRESH_TOKEN, refreshToken);
                return accessToken;
            }
        })
        .catch(error => {
            console.error("Error al refrescar el token:", error);
            logout();
            throw error;
        });
}

export function logout() {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
}

function willExpireToken(token) {
    const seconds = 60;
    const metaToken = token ? jwtDecode(token) : null;
    const { exp } = metaToken;
    const now = (Date.now() + seconds) / 1000;
    return now > exp;
}