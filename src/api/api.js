const url = process.env.VUE_APP_SERVER;

//Need write method to working correct (method = 'GET', 'POST' etc.)
const fetchFunc = (url, method, data) => {
    if (method === 'GET') {
        return fetch(url);
    }

    if (method !== 'GET') {
        return fetch(url, {
            method,
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }

};

//products api
export const getProducts = async () => {
    try {
        const res = await fetchFunc(url + '/storage', 'GET');
        
        return res.json();
    } catch (err) {
        return err;
    }
};

export const getProduct = async (id) => {
    try {
        const res = await fetchFunc(url + `/storage/${id}`, 'GET');

        return res.json();
    } catch (err) {
        console.log(err);
    }
};

export const postProduct = async (data) => {
    try {
        await fetchFunc(url + '/storage/create', 'POST', data);
    } catch (err) {
        console.log(err);
    }
};

export const updateProduct = async (data) => {
    try {
        const res = await fetchFunc(url + '/storage', 'PUT', data);

        return res.json();
    } catch (err) {
        return err;
    }
};

export const deleteProduct = async (id) => {
    try {
        const res = await fetchFunc(url + '/storage', 'DELETE', { _id: id });

        return res.json();
    } catch (err) {
         console.log(err);
    }
};

//orders api
export const getAllOrders = async () => {
    try {
        const orders = await fetchFunc(url + '/orders', 'GET');

        return orders.json();
    } catch (err) {
        console.log(err);
    }
};
