import axios from './api';

export async function getAll(endpoint = '/carts') {
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

export async function getOne(id) {
    try {
        const response = await axios.get(`/users/${id}/getCart/`);

        if (response.status === 200) return response.data;
        else {
            console.log(response);
            return null;
        }
    }
    catch (e) {
        e?.response ? console.log(e.response.data) : console.log(e);
    }
}

//hårdkodar userId och amount för testning
export async function addOne(productId) {
    const userId = 3;
    const amount = 1;
    try {
        const response = await axios.post(`/carts/addProduct/`, {
            userId,
            productId,
            amount
        });

        if (response.status === 200) return response.data;
        else {
            console.log(response);
            return null;
        }
    }
    catch (e) {
        e?.response ? console.log(e.response.data) : console.log(e);
    }
}

//hårdkodar userId och amount för testning
export async function removeOne(productId) {
    const userId = 3;
    const amount = 1;
    try {
        const response = await axios.put(`/carts/removeProduct/`, {
            userId,
            productId,
            amount
        });

        if (response.status === 200) return response.data;
        else {
            console.log(response);
            return null;
        }
    }
    catch (e) {
        e?.response ? console.log(e.response.data) : console.log(e);
    }
}

export async function markAsPayed(id) {
    try {
        const response = await axios.put(`/carts`, {
            id,
            payed: true
        });

        if (response.status === 200) return response.data;
        else {
            console.log(response);
            return null;
        }
    }
    catch (e) {
        e?.response ? console.log(e.response.data) : console.log(e);
    }
}
