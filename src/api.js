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

function getEvents(start_time, end_time, searchText) {
    if (searchText)
        return axios.get('event/near/' + start_time + '/' + end_time + '/' + searchText + '/');
    else
        return axios.get('event/near/' + start_time + '/' + end_time + '//');
}

function getGroups(searchText) {
    if (searchText)
        return axios.get('group/search/city/' + searchText + '/');
    else
        return axios.get('group/search/city//');
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

function getProfileData(userId) {
    if (userId) {
        return axios.get('user/profile/' + userId + '/');
    }
    return axios.get('user/myprofile/');
}

function getAllCategories() {
    return axios.get('group/category/all/');
}

function getUserAdminGroups(userId) {
    if (userId) {
        return axios.get('group/userin/admin/' + userId + '/');
    }
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

function uploadProfilePicture(profilePictureURL) {
    return axios.post('user/profile_picture/', { image_path: profilePictureURL });
}

function attendEvent(event_id) {
    return axios.post('event/attend/', { event_id })
}

function sendMessage(message) {
    return axios.post('messaging/pm/send/', message)
}

function getMessagesBetween(sender, start, end) {
    return axios.get('messaging/pm/pages/' + sender + '/' + start + '/' + end + '/');
}

function getMessagePreviews() {
    return axios.get('messaging/pm/list/');
}

function sendComment(comment) {
    return axios.post('event/comment/send/', comment);
}

function getComments(event_id) {
    return axios.get('event/comment/all/' + event_id + '/');
}

function getFriends() {
    return axios.get('user/friends/');
}

function sendFriendRequest(request) {
    return axios.post('user/friends/add/', request);
}

function getFriendRequests() {
    return axios.get('user/friends/requests/');
}

function acceptFriendRequests(response) {
    return axios.post('user/friends/response/', response);
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
    createEvent,
    uploadProfilePicture,
    attendEvent,
    sendMessage,
    getMessagesBetween,
    getMessagePreviews,
    getGroups,
    sendComment,
    getComments,
    getFriends,
    sendFriendRequest,
    getFriendRequests,
    acceptFriendRequests
}

export default api;