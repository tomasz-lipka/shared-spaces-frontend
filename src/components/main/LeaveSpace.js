import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeRequest } from '../../Helper';
import Config from '../../Config';

function LeaveSpace({ setMsg, spaceId, members }) {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    let userId;

    function setCurrentUserId() {
        members.forEach((item) => {
            if (item.user.login === sessionStorage.getItem('currentUser')) {
                userId = item.user.id;
            }
        });
    };

    async function leaveSpace() {
        setLoading(true);
        setCurrentUserId();
        if (userId) {
            setMsg(Config.waitMsg);
            let response = await makeRequest('/spaces/' + spaceId + '/members/' + userId, 'DELETE', null);
            response.ok ? navigate('/spaces') : setMsg(await response.text());
        } else {
            setMsg("Can't leave - not member");
        }
        setLoading(false);
    };

    return (
        <div className='sidebar-box'>
            <button onClick={leaveSpace} disabled={loading}>Leave space</button>
        </div>
    );
}

export default LeaveSpace;