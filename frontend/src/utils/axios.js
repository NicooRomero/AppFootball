import axios from 'axios';

const clientAxios = axios.create({
    baseURL: 'https://vps-3971710-x.dattaweb.com:5001/api/v1/'
});

export default clientAxios;
