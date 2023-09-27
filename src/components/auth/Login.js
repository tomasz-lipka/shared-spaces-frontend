import React, { useState } from 'react';
import { makeRequest } from "../../Helper"

function Login({ setAuthenticated, setMsg }) {
    const [loading, setLoading] = useState(false);
    const [login, setLogin] = useState('');
    const [pwd, setPwd] = useState('');

    async function handleLogin() {
        setLoading(true);
        let requestBody = JSON.stringify({
            "login": login,
            "password": pwd
        });
        let response = await makeRequest('/login', 'POST', requestBody);
        if (response.ok) {
            const data = await response.json();
            sessionStorage.setItem('access_token', data.access_token);
            sessionStorage.setItem('currentUser', login);
            setAuthenticated(true);
        } else {
            setMsg(await response.text())
        }
        setLoading(false)
    };

    return (
        <div>
            <div>
                <label>Login: </label>
                <br />
                <input
                    className='auth-input'
                    type="text"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                />
            </div>
            <div >
                <label>Password: </label>
                <br />
                <input
                    className='auth-input'
                    type="password"
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                />
            </div>
            <button onClick={handleLogin} disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
            </button>
        </div>
    );
}

export default Login