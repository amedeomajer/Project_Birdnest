import axios from 'axios';
const baseUrl = 'http://localhost:5000/'

export const getPilots = async () => {
	return await axios.get(`${baseUrl}pilots`);
};