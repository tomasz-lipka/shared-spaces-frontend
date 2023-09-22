import config from './config';

export function makeRequest(endpoint, method, body) {
    let response = fetch(config.apiUrl + endpoint, {
        method: method,
        body: body,
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${sessionStorage.getItem("access_token")}`
        },
    });
    return response
};