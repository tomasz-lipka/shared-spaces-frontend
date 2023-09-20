import config from '../config';
import React, { useState, useEffect } from 'react';

function Member({ value, fetchMembers, id, hasPermission }) {

    const [loadingDelete, setLoadingDelete] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

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

    const changeAdminPermission = async (userId, isChecked) => {
        console.log(isChecked)
        const response = await fetch(config.apiUrl + '/spaces/' + id + '/members/' + userId, {
            method: 'PUT',
            body: JSON.stringify({
                "is-admin": Boolean(isChecked)
              }),
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${sessionStorage.getItem("access_token")}`
            },
        });
        if (response.ok) {
            await response;
            fetchMembers();
           
        } 
    };



    function isCurrentUser(value) {
        return value.user.login === sessionStorage.getItem("currentUser")

    };

    const toggleSwitch = (userId) => {
        setIsChecked(!isChecked);
        changeAdminPermission(userId, !isChecked);
    };

    useEffect(() => {
        setIsChecked(value.is_admin)
    }, []);

    return (
        <div className="member" key={value.user.id}>
            <div className='div-flex'>
                <h4>{value.user.login}</h4>
            </div>
            <div className='div-flex-basic'>
                <div className='div-flex'>
                    <div className="switch-container">
                        <span className="label"><small>Admin: </small></span>
                        <label className="switch">
                            <input type="checkbox" checked={isChecked} onChange={() => toggleSwitch(value.user.id)} />
                            <span className="slider"></span>
                        </label>
                    </div>
                </div>
                <div className='div-flex'>
                    <button onClick={() => deleteMember(value.user.id)}
                        // disabled={
                        //     loadingDelete || !hasPermission 
                        //     // || isCurrentUser(value)
                        // }
                    >Delete</button>
                </div>
            </div>
        </div>
    )
}

export default Member