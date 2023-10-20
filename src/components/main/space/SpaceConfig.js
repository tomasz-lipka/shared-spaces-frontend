import React, { useState, useEffect } from 'react';
import { makeRequest } from '../../../Helper';
import { useParams } from 'react-router-dom';
import RenameSpace from './RenameSpace';
import DeleteSpace from './DeleteSpace';


function SpaceConfig({ setMsg }) {
    const { spaceId } = useParams();
    const [isAdmin, setIsAdmin] = useState(false);

    async function setCurrentUserAdmin() {
        let response = await makeRequest('/spaces/' + spaceId + '/members', 'GET', null);
        if (response.ok) {
            let members = await response.json();
            members.forEach((item) => {
                if (item.is_admin && item.user.login === sessionStorage.getItem('currentUser')) {
                    setIsAdmin(true);
                }
            });
        }
    };

    useEffect(() => {
        if (isNaN(spaceId)) {
            setMsg('Wrong URL')
            return;
        }
        setCurrentUserAdmin();
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <RenameSpace setMsg={setMsg} spaceId={spaceId} isAdmin={isAdmin} />
            <DeleteSpace setMsg={setMsg} spaceId={spaceId} isAdmin={isAdmin} />
        </div>
    );
}

export default SpaceConfig;