import axios from 'axios';
import FormData from 'form-data'

const API_URL = "http://25.21.230.242:8888/api";
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

function getAllCities() {
    return axios.get('/city/all/');
}

function createGroup(groupData) {
    return axios.post('group/create/', groupData);
}

function createEvent(eventData) {
    return axios.post('event/create/', eventData);
}

function getEvents(time) {
    return axios.get('event/near/' + time + '/');
}

function getEventDetails(id) {
    return axios.get('event/info/' + id + '/');
}

function getGroupDetails(id) {
    return axios.get('group/info/' + id + '/');
}

function uploadImage(img) {
    let data = new FormData();
    data.append('imgFile', img, img.fileName);
    return axios.post('upload/', data, {
        headers: {
            'accept': 'application/json',
            'Accept-Language': 'en-US,en;q=0.8',
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        }
    });
}

function getProfileData() {
    return axios.get('user/myprofile/');
}

function getAllCategories() {
    return axios.get('group/category/all/');
}

function getUserAdminGroups() {
    return axios.get('group/userin/admin/self/');
}

function getAllGroupMembers(id) {
    return axios.get('group/members/' + id + '/');
}

function getAllAttendees(id) {
    return axios.get('event/attend/' + id + '/');
}

function getImage(imagePath) {
    return API_URL + '/images/' + imagePath;
}


const api = {
    setAuthToken,
    login,
    signUp,
    getCities,
    getAllCities,
    createGroup,
    getEvents,
    getEventDetails,
    uploadImage,
    getProfileData,
    getAllCategories,
    getUserAdminGroups,
    getGroupDetails,
    getAllGroupMembers,
    getAllAttendees,
    getImage,
    createEvent
}

export default api;