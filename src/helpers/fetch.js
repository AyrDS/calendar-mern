const baseUrl = process.env.REACT_APP_API_URL;

export const fechtWithoutToken = (endpoint, data, method = 'GET') => {

    const url = `${baseUrl}/${endpoint}`; // localhost:8080/api/endpoint

    if (method === 'GET') {
        return fetch(url);
    } else {
        return fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }

}

export const fechtWithToken = (endpoint, data, method = 'GET') => {
    const url = `${baseUrl}/${endpoint}`; // localhost:8080/api/endpoint
    const token = localStorage.getItem('token') || '';

    if (method === 'GET') {
        return fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'x-token': token
            }
        });
    } else {
        return fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'x-token': token
            },
            body: JSON.stringify(data)
        })
    }
}