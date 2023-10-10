import { useState } from 'react';
import { makeRequest } from "../../Helper"
import Input from '../Input';
import Config from '../../Config';

function Settings({ setMsg }) {
    const [oldPwd, setOldPwd] = useState('');
    const [newPwd, setNewPwd] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');

    async function changePwd() {
        setMsg(Config.waitMsg)
        let requestBody = JSON.stringify({
            "old-password": oldPwd,
            "new-password": newPwd,
            "confirm-password": confirmPwd
        });
        let response = await makeRequest('/change-password', 'PUT', requestBody)
        setMsg(await response.text())
    };

    return (
        <div >
            <h2>Change password</h2>
            <Input setValue={setOldPwd} label={'Old password'} />
            <Input setValue={setNewPwd} label={'New password'} />
            <Input setValue={setConfirmPwd} label={'Confirm password'} />
            <br />
            <button onClick={changePwd} >Submit</button>
        </div>
    );
}

export default Settings;