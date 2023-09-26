import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeRequest } from "../Helper"

function Member({ member, fetchMembers, spaceId, setMsg }) {

    const navigate = useNavigate()
    const [isChecked, setIsChecked] = useState(member.is_admin);

    const deleteMember = async (userId, login) => {
        setMsg('Please wait...');
        let response = await makeRequest('/spaces/' + spaceId + '/members/' + userId, 'DELETE', null)

        if (sessionStorage.getItem("currentUser") === login) {
            alert("You left the space")
            navigate(-2);
        }
        if (response.ok) {
            fetchMembers();

        } else {
            setMsg(await response.text());
        }
    };

    const changeAdminPermission = async (userId, isChecked) => {
        setMsg('Please wait...');
        let requestBody = JSON.stringify({
            "is-admin": Boolean(isChecked)
        });
        let response = await makeRequest('/spaces/' + spaceId + '/members/' + userId, 'PUT', requestBody)

        if (response.ok) {
            fetchMembers();
        } else {
            setMsg(await response.text());
            setIsChecked(!isChecked)
        }
    };

    const toggleSwitch = (userId) => {
        setIsChecked(!isChecked);
        changeAdminPermission(userId, !isChecked);
    };

    return (
        <div className="member" key={member.user.id}>
            <div className='div-flex'>
                <h4>{member.user.login}</h4>
            </div>
            <div className='div-flex-basic'>
                <div className='div-flex'>
                    <div className="switch-container">
                        <span className="label"><small>Admin: </small></span>
                        <label className="switch">
                            <input type="checkbox" checked={isChecked} onChange={() => toggleSwitch(member.user.id)} />
                            <span className="slider"></span>
                        </label>
                    </div>
                </div>
                <div className='div-flex'>
                    <button onClick={() => deleteMember(member.user.id, member.user.login)} >Delete</button>
                </div>
            </div>
        </div>
    )
}

export default Member