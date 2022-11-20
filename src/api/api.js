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
        const products = await fetchFunc(url + '/storage', 'GET');
        
        return products.json();
    } catch (err) {
        console.log(err);
    }
};

export const getSomeProduct = async (id) => {
    try {
        await fetchFunc(url + '/storage', 'POST', id)
    } catch (err) {
        console.log(err);
    }
};

export const postProduct = async (data) => {
    try {
        await fetchFunc(url + '/storage/create', data, 'POST');
    } catch (err) {
        console.log(err);
    }
};
