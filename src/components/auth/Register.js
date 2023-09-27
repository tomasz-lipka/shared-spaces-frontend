import React, { useState } from 'react';
import Input from '../Input';
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
        if (response.ok) {
            setLogin('')
            setPwd('')
            setConfirmPwd('')
        }
        setMsg(await response.text())
        setLoading(false)
    };

    return (
        <div>
            <Input value={login} setValue={setLogin} label={'Login'} />
            <Input value={pwd} setValue={setPwd} label={'Password'} />
            <Input value={confirmPwd} setValue={setConfirmPwd} label={'Old password'} />
            <button onClick={handleRegister}>
                {loading ? 'Pending...' : 'Register'}
            </button>
        </div>
    );
}

export default Register