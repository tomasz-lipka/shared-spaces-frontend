import React, { useState, useEffect } from 'react';
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

    return (
        <div>
            <div className="left-div">
                <div>
                    <h3>New space</h3>
                    <label>Name: </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <button onClick={createSpace}>
                    {loading ? 'Creating...' : 'Create space'}
                </button>
                <p>{msg}</p>
            </div>
            <div className="right-div">
                <h3>My spaces</h3>
                {spaces.map((value) => {
                    return (
                        <div className="space" key={value.space.id}>
                            <p>{value.space.name}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
export default Spaces;