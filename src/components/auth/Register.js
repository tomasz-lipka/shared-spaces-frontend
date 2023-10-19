import React, { useState } from 'react';
import CustomInput from '../CustomInput';
import { makeRequest } from '../../Helper';
import Config from '../../Config';

function Register({ setMsg }) {
    const [login, setLogin] = useState('');
    const [pwd, setPwd] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleRegister() {
        setMsg(Config.blankSymbol);
        setLoading(true);
        let requestBody = JSON.stringify({
            'login': login,
            'password': pwd,
            'confirm-password': confirmPwd
        });
        let response = await makeRequest('/register', 'POST', requestBody);
        if (response.ok) {
            setLogin('');
            setPwd('');
            setConfirmPwd('');
            setMsg('User created');
        } else {
            setMsg(await response.text());
        }
        setLoading(false);
    };

    return (
        <div>
            <CustomInput value={login} setValue={setLogin} label={'Login'} type={'text'} />
            <CustomInput value={pwd} setValue={setPwd} label={'Password'} />
            <CustomInput value={confirmPwd} setValue={setConfirmPwd} label={'Confirm password'} />
            <button className='auth-button' onClick={handleRegister} disabled={loading}>
                {loading ? 'Pending...' : 'Register'}
            </button>
        </div>
    );
}

export default Register;