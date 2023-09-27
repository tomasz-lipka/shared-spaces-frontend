import React, { useState } from 'react';
import { makeRequest } from "../../../Helper"
import Config from '../../../Config';

function AddMember({ setMsg, spaceId, fetchMembers }) {
    const [userId, setUserId] = useState('');

    async function addMember() {
        setMsg(Config.waitMsg);
        let requestBody = JSON.stringify({
            "user-id": userId
        });
        let response = await makeRequest('/spaces/' + spaceId + '/members', 'POST', requestBody)
        if (response.ok) {
            fetchMembers();
            setUserId('')
        } else {
            setMsg(await response.text());
        }
    };

    return (
        <div>
            <div>
                <input
                    placeholder="Login of new member..."
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
            </div>
            <button onClick={addMember} >Add member</button>
        </div>
    );
}

export default AddMember