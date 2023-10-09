import { useState } from 'react';
import Input from '../Input';
import { makeRequest } from "../../Helper"
import Config from '../../Config';

function Login({ setAuthenticated, setMsg }) {
    const [loading, setLoading] = useState(false);
    const [login, setLogin] = useState('');
    const [pwd, setPwd] = useState('');

    async function handleLogin() {
        setMsg(Config.blankSymbol)
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
            <Input setValue={setLogin} label={'Login'} type={'text'} />
            <Input setValue={setPwd} label={'Password'} />
            <button onClick={handleLogin} disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
            </button>
        </div>
    );
}

export default Login