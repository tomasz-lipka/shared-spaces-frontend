import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeRequest } from "../Helper"

function Member({ member, fetchMembers, spaceId, setMsg, loading, setLoading }) {

    const navigate = useNavigate()
    const [isChecked, setIsChecked] = useState(false);

    function startFunction() {
        setMsg('Please wait...');
        setLoading(true);
    }

    const deleteMember = async (userId, login) => {
        startFunction()
        let response = await makeRequest('/spaces/' + spaceId + '/members/' + userId, 'DELETE', null)

        if (sessionStorage.getItem("currentUser") === login) {
            setLoading(true);
            alert("You left the space")
            navigate(-2);
        }
        if (response.ok) {
            fetchMembers();

        } else {
            setMsg(await response.text());
            setLoading(false);
        }
    };

    const changeAdminPermission = async (userId, isChecked) => {
        startFunction()
        let requestBody = JSON.stringify({
            "is-admin": Boolean(isChecked)
        });
        let response = await makeRequest('/spaces/' + spaceId + '/members/' + userId, 'PUT', requestBody)

        if (response.ok) {
            fetchMembers();
        } else {
            setMsg(await response.text());
            setIsChecked(!isChecked)
            setLoading(false);
        }
    };

    const toggleSwitch = (userId) => {
        setIsChecked(!isChecked);
        changeAdminPermission(userId, !isChecked);
    };

    useEffect(() => {
        setIsChecked(member.is_admin)
    }, []);

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
                    <button onClick={() => deleteMember(member.user.id, member.user.login)} disabled={loading}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default Member