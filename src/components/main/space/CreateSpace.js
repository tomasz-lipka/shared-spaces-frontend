import React, { useState } from 'react';
import { makeRequest } from "../../../Helper"
import Config from '../../../Config';

function CreateSpace({ setMsg, fetchSpaces }) {
    const [spaceName, setSpaceName] = useState('');

    async function createSpace() {
        setMsg(Config.waitMsg)
        let requestBody = JSON.stringify({
            "name": spaceName
        });
        let response = await makeRequest('/spaces', 'POST', requestBody)
        if (response.ok) {
            fetchSpaces();
            setSpaceName('')
        } else {
            setMsg(await response.text());
        }
    };

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            createSpace();
        }
    };

    return (
        <div>
            <div>
                <input
                    placeholder="Name for a new space..."
                    type="text"
                    value={spaceName}
                    onChange={(e) => setSpaceName(e.target.value)}
                    name='create-space'
                    onKeyDown={handleKeyDown}
                />
            </div>
            <button onClick={createSpace} >Create a new space</button>
        </div>
    );
}

export default CreateSpace