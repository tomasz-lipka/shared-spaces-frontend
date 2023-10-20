import React, { useState } from 'react';
import { makeRequest } from '../../../Helper'
import Config from '../../../Config';

function CreateSpace({ setMsg, fetchSpaces }) {
    const [spaceName, setSpaceName] = useState('');
    const [loading, setLoading] = useState(false);

    async function createSpace() {
        setMsg(Config.waitMsg);
        setLoading(true);
        let requestBody = JSON.stringify({
            'name': spaceName
        });
        let response = await makeRequest('/spaces', 'POST', requestBody);
        if (response.ok) {
            fetchSpaces();
            setSpaceName('');
        } else {
            setMsg(await response.text());
        }
        setLoading(false);
    };

    return (
        <div className='sidebar-box'>
            <div>
                <input
                    placeholder='Space name'
                    type='text'
                    value={spaceName}
                    onChange={(e) => setSpaceName(e.target.value)}
                    name='create-space'
                />
            </div>
            <button className='margin-top' onClick={createSpace} disabled={loading}>Create space</button>
        </div>
    );
}

export default CreateSpace;