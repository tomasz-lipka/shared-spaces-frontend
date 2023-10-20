import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeRequest } from '../../../Helper';
import Config from '../../../Config';

function DeleteSpace({ setMsg, spaceId, isAdmin }) {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function deleteSpace() {
        setLoading(true);
        const confirmed = window.confirm('Are you sure you want to delete this space?');
        if (confirmed) {
            setMsg(Config.waitMsg);
            let response = await makeRequest('/spaces/' + spaceId, 'DELETE', null);
            response.ok ? navigate('/spaces') : setMsg(await response.text());
        }
        setLoading(false);
    };

    return (
        <div className='config-box'>
            <button onClick={deleteSpace} disabled={!isAdmin || loading} >Delete space</button>
        </div>
    );
}

export default DeleteSpace;