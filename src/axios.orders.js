import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://my-burger-app-da6a3-default-rtdb.firebaseio.com/'
});

export default instance;