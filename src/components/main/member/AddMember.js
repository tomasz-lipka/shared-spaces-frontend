import { useState } from 'react';
import { makeRequest } from '../../../Helper';
import Config from '../../../Config';

function AddMember({ setMsg, spaceId, fetchMembers, isAdmin }) {
    const [login, setLogin] = useState('');

    async function addMember() {
        setMsg(Config.waitMsg);
        let requestBody = JSON.stringify({
            'login': login
        });
        let response = await makeRequest('/spaces/' + spaceId + '/members', 'POST', requestBody);
        if (response.ok) {
            fetchMembers();
            setLogin('');
        } else {
            setMsg(await response.text());
        }
    };

    return (
        <div className='sidebar-box'>
            <div>
                <input
                    placeholder='Member login'
                    type='text'
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    name='add-member'
                />
            </div>
            <button className='margin-top' onClick={addMember} disabled={!isAdmin}>Add member</button>
        </div>
    );
}

export default AddMember;