import React, { useState } from 'react';
import { makeRequest } from "../../Helper"
import Config from '../../Config';

function Register({ setMsg }) {
    const [login, setLogin] = useState('');
    const [pwd, setPwd] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleRegister() {
        setMsg(Config.blankMsg)
        setLoading(true)
        let requestBody = JSON.stringify({
            "login": login,
            "password": pwd,
            "confirm-password": confirmPwd
        });
        let response = await makeRequest('/register', 'POST', requestBody);
        setMsg(await response.text())
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
            <div>
                <label>Password: </label>
                <br />
                <input
                    className='auth-input'
                    type="password"
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                />
            </div>
            <div>
                <label>Confirm password: </label>
                <br />
                <input
                    className='auth-input'
                    type="password"
                    value={confirmPwd}
                    onChange={(e) => setConfirmPwd(e.target.value)}
                />
            </div>
            <button onClick={handleRegister}>
                {loading ? 'Pending...' : 'Register'}
            </button>
        </div>
    );
}

export default Register