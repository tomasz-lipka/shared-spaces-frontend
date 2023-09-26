import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeRequest } from "../Helper"
import Config from '../Config';

function Spaces({ setMsg }) {
    const navigate = useNavigate()
    const [spaceName, setSpaceName] = useState('');
    const [spaces, setSpaces] = useState([]);

    async function fetchSpaces() {
        setMsg(Config.waitMsg)
        let response = await makeRequest('/spaces', 'GET', null)
        if (response.ok) {
            setSpaces(await response.json());
            setMsg(Config.blankMsg);
        } else {
            setMsg(await response.text())
        }
    };

    async function createSpace() {
        setMsg(Config.waitMsg)
        let requestBody = JSON.stringify({
            "name": spaceName
        });
        let response = await makeRequest('/spaces', 'POST', requestBody)
        if (response.ok) {
            fetchSpaces();
            setSpaceName('')
        } else {
            setMsg(await response.text());
        }
    };

    useEffect(() => {
        fetchSpaces();
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <div className="sidebar">
                <br />
                <div>
                    <input
                        placeholder="Name for new space..."
                        type="text"
                        value={spaceName}
                        onChange={(e) => setSpaceName(e.target.value)}
                    />
                </div>
                <button onClick={createSpace} >Create a new space</button>
            </div>
            <div className="content">
                <h2>Spaces</h2>
                {
                    spaces.length === 0 ? (
                        <p>You have no spaces</p>
                    ) : (
                        spaces.map((item) => (
                            <a href="#/"
                                onClick={(e) => { e.preventDefault(); navigate(`/spaces/${item.space.id}`); }}
                                className="space-link"
                                key={item.space.id}>
                                <div className="space"><p>{item.space.name}</p></div>
                            </a>
                        ))
                    )
                }
            </div>
        </div>
    );
}
export default Spaces;