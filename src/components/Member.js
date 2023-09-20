import config from '../config';
import React, { useState, useEffect } from 'react';

function Member({ value, fetchMembers, id ,isCurrentUserAdmin}) {

    const [loadingDelete, setLoadingDelete] = useState(false);


    const deleteMember = async (userId) => {
        setLoadingDelete(true)
        const response = await fetch(config.apiUrl + '/spaces/' + id + '/members/' + userId, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${sessionStorage.getItem("access_token")}`
            },
        });
        if (response.ok) {
            await response;
            fetchMembers();
        }
        setLoadingDelete(false)
    };

   

    function isCurrentUser(value) {
        return value.user.login === sessionStorage.getItem("currentUser")

    };


    return (
        <div className="member" key={value.user.id}>
            <p>{value.user.login}</p>
            <p>{value.is_admin ? 'is admin' : 'no admin'}</p>
            <button onClick={() => deleteMember(value.user.id)} 
            disabled={
                loadingDelete || 
                !isCurrentUserAdmin
                || 
                isCurrentUser(value)
            }
            >Delete</button>
        </div>
    )
}

export default Member