import axios from 'axios';

const API_URL = "http://localhost:8888/api";
const token = localStorage.getItem('token');

if (token) setAuthToken(token);

axios.defaults.baseURL = API_URL;

function setAuthToken(token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

function login(userData) {
    return axios.post('/user/login/', userData);
}

function signUp(userData) {
    return axios.post('/user/signup/', userData);
}

function getCities(searchText) {
    return axios.get('/city/search/' + searchText + "/");
}


const api = {
    setAuthToken,
    login,
    signUp,
    getCities
}

export default api;