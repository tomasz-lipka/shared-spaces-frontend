import { useState } from 'react';
import { makeRequest } from '../../../Helper';
import Config from '../../../Config';

function RenameSpace({ setMsg, spaceId, isAdmin }) {
    const [spaceNewName, setSpaceNewName] = useState('');

    async function renameSpace() {
        setMsg(Config.waitMsg);
        let requestBody = JSON.stringify({
            'new-name': spaceNewName
        });
        let response = await makeRequest('/spaces/' + spaceId, 'PUT', requestBody);
        if (response.ok) {
            window.location.reload();
        } else {
            setMsg(await response.text());
        }
    };

    return (
        <div className='sidebar-box'>
            <input
                placeholder='New space name'
                type='text'
                value={spaceNewName}
                onChange={(e) => setSpaceNewName(e.target.value)}
                name='rename-space'
                className='text-align-left'
            />
            <button className='margin-top' onClick={renameSpace} disabled={!isAdmin}>Rename space</button>
        </div>
    );
}

export default RenameSpace;