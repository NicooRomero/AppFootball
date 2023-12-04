import axios from 'axios';

const clientAxios = axios.create({
    baseURL: 'http://serveranon.ddns.net:3000/api/v1/'
});

export default clientAxios;