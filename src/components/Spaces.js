import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeRequest } from "../Helper"

function Spaces({ setMsg }) {
    const [spaceName, setSpaceName] = useState('');
    const [spaces, setSpaces] = useState([]);
    const [loading, setLoading] = useState(false);

    function startFunction() {
        setMsg('Please wait...')
        setLoading(true)
    }

    const createSpace = async () => {
        startFunction()
        let requestBody = JSON.stringify({
            "name": spaceName
        });
        let response = await makeRequest('/spaces', 'POST', requestBody)
        if (response.ok) {
            fetchSpaces();
        } else {
            setMsg(await response.text());
            setLoading(false)
        }
    };

    const fetchSpaces = async () => {
        startFunction()
        let response = await makeRequest('/spaces', 'GET', null)
        if (response.ok) {
            setSpaces(await response.json());
        }
        setMsg('\u00A0');
        setLoading(false);
    };

    useEffect(() => {
        fetchSpaces();
    }, []);

    const navigate = useNavigate()
    return (
        <div>
            <div className="left-div">
                <br />
                <div>
                    <input
                        placeholder="Name for new space..."
                        type="text"
                        value={spaceName}
                        onChange={(e) => setSpaceName(e.target.value)}
                    />
                </div>
                <button onClick={createSpace} disabled={loading}>Create a new space</button>
            </div>
            <div className="right-div">
                <h3>My spaces</h3>
                {spaces.map((item) => {
                    return (
                        <a
                            href="#"
                            onClick={(e) => { e.preventDefault(); navigate(`/space/${item.space.id}`); }}
                            className="link-like" key={item.space.id}>
                            <div className="space">
                                <p>{item.space.name}</p>
                            </div>
                        </a>
                    );
                })}
            </div>
        </div>
    );
}
export default Spaces;