import axios from 'axios';

const API_URL = "http://139.179.215.141:8888/api";
axios.defaults.baseURL = API_URL;

function setAuthToken(token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

function login(userData) {
    return axios.post('/login/', userData);
}

function signUp(userData) {
    return axios.post('/signup/', userData);
}

function getCities(searchText) {
    return axios.get('/city/search/' + searchText + "/");
}



const api = {
    login,
    signUp,
    setAuthToken
}

export default api;