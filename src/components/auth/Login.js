import { useState } from 'react';
import CustomInput from '../CustomInput';
import { makeRequest } from "../../Helper"
import Config from '../../Config';
import { useNavigate } from "react-router-dom";

function Login({ setAuthenticated, setMsg }) {
    const [loading, setLoading] = useState(false);
    const [login, setLogin] = useState('');
    const [pwd, setPwd] = useState('');
    const navigate = useNavigate();

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
            navigate('/spaces');
        } else {
            setMsg(await response.text())
        }
        setLoading(false)
    };

    return (
        <div>
            <CustomInput setValue={setLogin} label={'Login'} type={'text'} />
            <CustomInput setValue={setPwd} label={'Password'} />
            <button onClick={handleLogin} disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
            </button>
        </div>
    );
}

export default Login