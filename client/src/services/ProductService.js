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

//osäker på om den här ska ligga här eller om den kommer ligga i review service, vi får se hur det blir.
//tror dock att den ska ligga kvar här
export async function addRating(product_id, ratingData) {
    try {
        // Ensure we're sending a clean payload
        const payload = {
            rating: ratingData.rating,  // Just the numeric value
            product_id: product_id
        };

        console.log("Sending request to:", `/products/${product_id}/addRating`);
        console.log("Payload:", payload);

        const response = await axios.post(`/products/${product_id}/addRating`, payload);

        if (response.status >= 200 && response.status < 300) {
            return response.data;
        } else {
            console.error("Unexpected API response:", response);
            throw new Error(`API returned status ${response.status}`);
        }
    } catch (e) {
        console.error("Full error from API call:", e);
        if (e.response) {
            console.error("Response data:", e.response.data);
            console.error("Response status:", e.response.status);
            throw new Error(e.response.data.message || "Failed to submit rating");
        }
        throw new Error(e.message || "Network error");
    }
}