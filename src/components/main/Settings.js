import React, { useState } from 'react';
import { makeRequest } from '../../Helper';
import CustomInput from '../CustomInput';
import Config from '../../Config';

function Settings({ setMsg }) {
    const [oldPwd, setOldPwd] = useState('');
    const [newPwd, setNewPwd] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');
    const [loading, setLoading] = useState(false);

    async function changePwd() {
        setLoading(true);
        setMsg(Config.waitMsg);
        let requestBody = JSON.stringify({
            'old-password': oldPwd,
            'new-password': newPwd,
            'confirm-password': confirmPwd
        });
        let response = await makeRequest('/change-password', 'PUT', requestBody);
        if (response.ok) {
            setOldPwd('');
            setNewPwd('');
            setConfirmPwd('');
        }
        setMsg(await response.text());
        setLoading(false);
    };

    return (
        <div>
            <h2>Change password</h2>
            <CustomInput value={oldPwd} setValue={setOldPwd} label={'Old password'} />
            <CustomInput value={newPwd} setValue={setNewPwd} label={'New password'} />
            <CustomInput value={confirmPwd} setValue={setConfirmPwd} label={'Confirm password'} />
            <br />
            <button onClick={changePwd} disabled={loading}>Submit</button>
        </div>
    );
}

export default Settings;
