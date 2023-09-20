import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import config from '../config';

function Members() {
    
    const { id } = useParams();
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
    }, []);

    return (
        <h3>{space.name} {'>'} members</h3>
    );
}

export default Members