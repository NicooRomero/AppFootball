import axios from 'axios';

const clientAxios = axios.create({
    baseURL: 'http://localhost:4000/api/v1/'
});

export default clientAxios;