import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import config from '../config';

function Members() {

    const { id } = useParams();
    const [space, setSpace] = useState('');
    const [members, setMembers] = useState([]);
    const [loadingMembers, setLoadingMembers] = useState(false);
    const navigate = useNavigate()

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
        }
    };

    useEffect(() => {
        fetchSpace();
        fetchMembers();
    }, []);

    return (
        <div>
            <div className="left-div">
                <br />
                <a href="#" onClick={(e) => { e.preventDefault(); navigate(-1); }}>{'<<'}Go back</a>


            </div>
            <div className="right-div">
                <h3>{space.name} {'>'} members</h3>
                <p>{loadingMembers ? 'Loading...' : '\u00A0'}</p>
                {members.map((value) => {
                            console.log(value)

                    return (
                        <div className="member" key={value.user.id}>
                            <p>{value.user.login}</p>
                            <p>{value.is_admin ? 'is admin' : 'no admin'}</p>
                        </div>
                    )
                })}
            </div>
        </div >
    );
}

export default Members