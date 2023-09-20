import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import config from '../config';

function Members() {

    const { id } = useParams();
    const [space, setSpace] = useState('');
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

    useEffect(() => {
        fetchSpace();
    }, []);

    return (
        <div>
            <div className="left-div">
                <br/>
                <a href="#" onClick={(e) => { e.preventDefault(); navigate(-1); }}>{'<<'}Go back</a>
                

            </div>
            <div className="right-div">
                <h3>{space.name} {'>'} members</h3>
            </div>
        </div >
    );
}

export default Members