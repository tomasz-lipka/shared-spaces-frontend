import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../config';

function Spaces() {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('');
    const [spaces, setSpaces] = useState([]);

    const createSpace = async () => {
        setMsg('')
        setLoading(true);
        const response = await fetch(config.apiUrl + '/spaces', {
            method: 'POST',
            body: `{
            "name": "${name}"
          }`,
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${sessionStorage.getItem("access_token")}`
            },
        });
        if (response.ok) {
            fetchSpaces();
            setLoading(false);
        } else {
            const errorMessage = await response.text();
            setMsg(errorMessage);
            setLoading(false);
        }
    };


    const fetchSpaces = async () => {
        const response = await fetch(config.apiUrl + '/spaces', {
            method: 'GET',
            headers: {
                authorization: `Bearer ${sessionStorage.getItem("access_token")}`
            },
        });
        if (response.ok) {
            const data = await response.json();
            setSpaces(data);
        }
    };

    useEffect(() => {
        fetchSpaces();
    }, []);

    const navigate = useNavigate()
    return (
        <div>
            <div className="left-div">
                <div>
                    <h4>New space</h4>
                    <input
                        placeholder="Enter the name..."
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <button onClick={createSpace} disabled={loading}>
                    {loading ? 'Creating...' : 'Create space'}
                </button>
                <p>{msg}</p>
            </div>
            <div className="right-div">
                <h3>My spaces</h3>
                {spaces.map((value) => {
                    let id = value.space.id
                    return (
                        <a href="#" onClick={(e) => { e.preventDefault(); navigate(`/space/${id}`); }} className="link-like">
                            <div className="space" key={value.space.id}>
                                <p>{value.space.name}</p>
                            </div>
                        </a>
                    );
                })}
            </div>
        </div>
    );
}
export default Spaces;