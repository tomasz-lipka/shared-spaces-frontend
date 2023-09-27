import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { makeRequest } from "../../Helper"
import Breadcrumb from './Breadcrumb';

function ChangePwd({ setMsg }) {
    const navigate = useNavigate()
    const [oldPwd, setOldPwd] = useState('');
    const [newPwd, setNewPwd] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');

    const changePwd = async () => {
        setMsg('Please wait...')
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
            <div>
                <label>Old password: </label>
                <br />
                <input
                    className='auth-input'
                    type="password"
                    value={oldPwd}
                    onChange={(e) => setOldPwd(e.target.value)}
                />
            </div>
            <div>
                <label>New password: </label>
                <br />
                <input
                    className='auth-input'
                    type="password"
                    value={newPwd}
                    onChange={(e) => setNewPwd(e.target.value)}
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
            <br />
            <button onClick={changePwd} >Submit</button>
        </div>
    );
}

export default ChangePwd;
