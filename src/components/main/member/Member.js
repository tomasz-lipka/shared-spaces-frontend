import React, { useState } from 'react';
import { makeRequest } from '../../../Helper';
import Config from '../../../Config';

function Member({ member, fetchMembers, spaceId, setMsg, isAdmin, setIsAdmin }) {
    const [classN, setClassN] = useState('member-tile');
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [changeAdminLoading, setChangeAdminLoading] = useState(false);

    async function deleteMember(userId) {
        setDeleteLoading(true);
        const confirmed = window.confirm('Are you sure you want to delete this member?');
        if (confirmed) {
            setMsg(Config.waitMsg);
            let response = await makeRequest('/spaces/' + spaceId + '/members/' + userId, 'DELETE', null);
            if (response.ok) {
                setClassN('member-tile fade-out')
                setTimeout(() => {
                    fetchMembers();
                }, 500);
            } else {
                setMsg(await response.text())
            }
        }
        setDeleteLoading(false);
    };

    async function changeAdminPermission(userId) {
        setChangeAdminLoading(true);
        setMsg(Config.waitMsg);
        let requestBody = JSON.stringify({
            'is-admin': !Boolean(member.is_admin)
        });
        let response = await makeRequest('/spaces/' + spaceId + '/members/' + userId, 'PUT', requestBody);
        if (response.ok) {
            fetchMembers();
            setIsAdmin(!Boolean(member.is_admin));
        } else {
            setMsg(await response.text());
        }
        setChangeAdminLoading(false);
    };

    return (
        <div className={classN} key={member.user.id}>
            <b>{member.user.login}</b>
            <br />
            {member.is_admin ? 'admin' : Config.blankSymbol}
            <div>
                <button className='margin-top' onClick={() => changeAdminPermission(member.user.id)} disabled={!isAdmin || changeAdminLoading}>
                    {member.is_admin ? 'Unmake admin' : 'Make admin'}
                </button>
            </div>
            <div>
                <button className='margin-top' onClick={() => deleteMember(member.user.id)} disabled={!isAdmin || deleteLoading}>
                    Delete
                </button>
            </div>
        </div>
    );
}

export default Member;