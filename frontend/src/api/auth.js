import { ACCESS_TOKEN, REFRESH_TOKEN, DATA_USER } from '../utils/const';
import jwtDecode from 'jwt-decode';

const baseURL = 'http://localhost:4000/api/v1/';

export function getAccToken() {
    if (typeof window !== 'undefined') {
        const accessToken = localStorage.getItem(ACCESS_TOKEN);

        if (!accessToken || accessToken === 'null') {
            logout();
            return null;
        }

        return willExpireToken(accessToken) ? null : accessToken;
    }

    return null;
}

export function getRefToken() {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);

    if(!refreshToken || refreshToken === 'null') {
        return null;
    }

    return willExpireToken(refreshToken) ? null : refreshToken;
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

    fetch(url, params)
        .then(response => {
            if(response.status !== 200) {
                return null;
            }
            return response.json();
        })
        .then(result => {
            if(!result) {
                logout();
            } else {
                const { accessToken, refreshToken } = result;
                localStorage.setItem(ACCESS_TOKEN, accessToken);
                localStorage.setItem(REFRESH_TOKEN, refreshToken);
            }
        })
}

export function logout() {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
}

function willExpireToken(token) {
    const seconds = 60;
    const metaToken = jwtDecode(token);
    const { exp } = metaToken;
    const now = (Date.now() + seconds) / 1000;
    return now > exp;
}