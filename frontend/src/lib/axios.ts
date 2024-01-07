import axios from 'axios';

const customAxios = axios.create({
  baseURL: 'http://localhost:3005',
});

export default customAxios;
