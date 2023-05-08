import axios from 'axios';
const instance = axios.create({
  baseURL: 'http://156.236.73.178:3005'
})

export default instance