import axios from 'axios';

let _token = localStorage.getItem('userToken');
let _baseUrl = '';

async function apiManager({
    headers,
    method = "get",
    path = "",
    params = null,
    data = null,
    baseUrl = _baseUrl,
    token = _token
}) {
    let _headers = { headers: headers || {} };
    if (token) {
        _headers = { headers: { Authorization: `Bearer ${token}`, ...headers } }
    }

    try {
        const response = await axios[method]({
            url: baseUrl + path,
            params:params,
            data:data,
            headers: _headers || { 'Content-Type': 'application/json' }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default apiManager;