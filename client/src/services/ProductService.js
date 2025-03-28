import axios from './api';

export async function getAll(endpoint = '/products') {
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
        const response = await axios.get(`/products/${id}`);

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

export async function create(product) {
    try {
        const response = await axios.post(`/products`, product);

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

export async function update(product) {
    try {
        const response = await axios.put(`/products`, product);

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

export async function remove(id) {
    try {
        const response = await axios.delete(`/products`, { data: { id } });

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

// måste skicka med rating som ett objekt här
export async function addRating(product_id, { rating }) {
    try {
        const response = await axios.post(`/products/${product_id}/addRating`, { product_id, rating });

        if (response.status >= 200 && response.status < 300) {
            return response.data;
        } else {
            throw new Error(`API returned status ${response.status}`);
        }
    } catch (e) {
        console.error("Full error from API call:", e);
        if (e.response) {
            throw new Error(e.response.data.message || "Kunde inte sätta betyg");
        }
        throw new Error(e.message || "Nätverksfel");
    }
}
