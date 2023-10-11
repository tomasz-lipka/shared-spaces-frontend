import { useState } from 'react';
import { makeRequest } from '../../../Helper';
import Config from '../../../Config';

function RenameSpace({ setMsg, spaceId, fetchSpace, isAdmin }) {
    const [spaceNewName, setSpaceNewName] = useState('');

    async function renameSpace() {
        setMsg(Config.waitMsg);
        let requestBody = JSON.stringify({
            'new-name': spaceNewName
        });
        let response = await makeRequest('/spaces/' + spaceId, 'PUT', requestBody);
        if (response.ok) {
            fetchSpace();
            setSpaceNewName('');
        } else {
            setMsg(await response.text());
        }
    };

    return (
        <div className='sidebar-box'>
            <input
                placeholder='Space new name'
                type='text'
                value={spaceNewName}
                onChange={(e) => setSpaceNewName(e.target.value)}
                name='rename-space'
            />
            <button className='margin-top' onClick={renameSpace} disabled={!isAdmin}>Rename space</button>
        </div>
    );
}

export default RenameSpace;