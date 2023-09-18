import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import config from '../config';

function Space() {
    const { id } = useParams();
    const navigate = useNavigate()
    const [space, setSpace] = useState('');

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
    });

    return (
        <div>
            <div className="left-div">
                <button onClick={() => navigate(-1)}>Go back</button>
            </div>
            <div className="right-div">
                <h3>Space {space.name}</h3>
            </div>
        </div>
    );
}

export default Space;