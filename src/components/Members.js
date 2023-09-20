import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import config from '../config';
import Member from "./Member"

function Members() {

    const { id } = useParams();
    const [space, setSpace] = useState('');
    const [members, setMembers] = useState([]);
    const [loadingMembers, setLoadingMembers] = useState(false);
    const [loadingAddMember, setLoadingAddMember] = useState(false);
    const [userId, setUserId] = useState('');
    const navigate = useNavigate()
    const [msg, setMsg] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const fetchSpace = async () => {
        const response = await fetch(config.apiUrl + '/spaces/' + id, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${sessionStorage.getItem("access_token")}`
            },
        });
        if (response.ok) {
            const data = await response.json();
            setSpace(data);
        }
    };

    const fetchMembers = async () => {
        setMsg('')
        setLoadingMembers(true)
        const response = await fetch(config.apiUrl + '/spaces/' + id + '/members', {
            method: 'GET',
            headers: {
                authorization: `Bearer ${sessionStorage.getItem("access_token")}`
            },
        });
        if (response.ok) {
            const data = await response.json();
            setMembers(data);
            setLoadingMembers(false)
            // setCurrentUserAdmin(data)
            // setIsCurrentUserFun(data)
        }


    };

    const addMember = async () => {
        setLoadingAddMember(true)
        const response = await fetch(config.apiUrl + '/spaces/' + id + '/members', {
            method: 'POST',
            body: `{
            "user-id": "${userId}"
          }`,
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${sessionStorage.getItem("access_token")}`
            },
        });
        if (response.ok) {
            fetchMembers();
            setLoadingAddMember(false);
        } else {
            const errorMessage = await response.text();
            setMsg(errorMessage);
            setLoadingAddMember(false);
        }
    };

    const setCurrentUserAdmin = (data) => {
        data.map((value) => {
            if (value.user.login === sessionStorage.getItem("currentUser") && value.is_admin) {
                setIsAdmin(true);
            }
        });
    };


    useEffect(() => {
        
        fetchSpace();
        fetchMembers();

    }, []);

    return (
        <div >
            <div className="left-div">
                <br />
                <a href="#" onClick={(e) => { e.preventDefault(); navigate(-1); }}>{'<<'}Go back</a>
                <hr />
                <div>
                    <h4>Add member</h4>
                    <input
                        placeholder="Login of member here..."
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    />
                </div>
                <button onClick={addMember} disabled={loadingAddMember || !isAdmin}>
                    {loadingAddMember ? 'Adding...' : 'Add'}
                </button>
                <p>{msg}</p>
                <hr />

            </div>
            <div className="right-div">
                <h3>{space.name} {'>'} members</h3>
                <p>{loadingMembers ? 'Loading...' : '\u00A0'}</p>
                {members.map((value) => {
                    return <Member value={value}  fetchMembers={fetchMembers} id={id} 
                    hasPermission={value.user.login === sessionStorage.getItem("currentUser") && value.is_admin}
                     />
                })}
            </div>
        </div >
    );
}

export default Members