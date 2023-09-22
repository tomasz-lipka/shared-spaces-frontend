import React, { useState, useEffect } from 'react';
import { makeRequest } from "../Helper"

function EditPwd({ setMsg }) {
    const [oldPwd, setOldPwd] = useState('');
    const [newPwd, setNewPwd] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');

    const handleSubmit = async () => {
        let requestBody = JSON.stringify({
            "old-password": oldPwd,
            "new-password": newPwd,
            "confirm-password": confirmPwd
        });
        let response = await makeRequest('/change-password', 'PUT', requestBody)


        const msg = await response.text();
        setMsg(msg)
    };

    useEffect(() => {
        setMsg('-')
    }, []);

    return (
        <div>
            <h2>Change password</h2>
            <p>Old password: </p>
            <input
                type="password"
                value={oldPwd}
                onChange={(e) => setOldPwd(e.target.value)}
            />
            <p>New password: </p>
            <input
                type="password"
                value={newPwd}
                onChange={(e) => setNewPwd(e.target.value)}
            />
            <p>Confirm password: </p>
            <input
                type="password"
                value={confirmPwd}
                onChange={(e) => setConfirmPwd(e.target.value)}
            />
            <br /><br />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default EditPwd;
