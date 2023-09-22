import Config from './Config';

export function makeRequest(endpoint, method, body) {
    let response = fetch(Config.apiUrl + endpoint, {
        method: method,
        body: body,
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${sessionStorage.getItem("access_token")}`
        },
    });
    return response
};

export function makeShareRequest(endpoint, method, body) {
    let response = fetch(Config.apiUrl + endpoint, {
        method: method,
        body: body,
        headers: {
            authorization: `Bearer ${sessionStorage.getItem("access_token")}`
        },
    });
    return response
};