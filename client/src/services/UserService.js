import axios from './api';

export async function getAll(endpoint = '/users') {
    try {
        const response = await axios.get(endpoint);

        if (response.status === 200) return response.data;
        else {
            console.log(response);
            return [];
        }
    }
    catch (e) {
        e?.response ? console.log(e.response.data) : console.log(e);
    }
}