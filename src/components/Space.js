import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Share from "./Share"
import { makeRequest, makeShareRequest } from "../Helper"

function Space({ setMsg }) {
    const { spaceId } = useParams();
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [space, setSpace] = useState('');
    const [text, setText] = useState('');
    const [shares, setShares] = useState([]);
    const [spaceNewName, setSpaceNewName] = useState('');

    function startFunction() {
        setMsg('Please wait...')
        setLoading(true)
    }

    const fetchSpace = async () => {
        startFunction()
        let response = await makeRequest('/spaces/' + spaceId, 'GET', null)
        if (response.ok) {
            setSpace(await response.json());
        }
        setMsg('\u00A0');
        setLoading(false);
    };

    const fetchShares = async () => {
        startFunction()
        let response = await makeRequest('/spaces/' + spaceId + '/shares', 'GET', null)
        if (response.ok) {
            setShares(await response.json());
        }
        setMsg('\u00A0');
        setLoading(false);
    };

    const createShare = async () => {
        startFunction()

        let bodyContent = new FormData();
        bodyContent.append("text", text);
        // bodyContent.append("file", "/workspaces/shared-spaces/project/test/test-image.jpg");

        let response = await makeShareRequest('/spaces/' + spaceId + '/shares', 'POST', bodyContent)
        if (response.ok) {
            fetchShares();
        } else {
            setMsg(await response.text());
            setLoading(false)
        }
    }

    const renameSpace = async () => {
        startFunction()
        let requestBody = JSON.stringify({
            "new-name": spaceNewName
        });
        let response = await makeRequest('/spaces/' + spaceId, 'PUT', requestBody);
        if (response.ok) {
            fetchSpace();
        } else {
            setMsg(await response.text());
            setLoading(false)
        }
    };

    const deleteSpace = async () => {
        startFunction()
        let response = await makeRequest('/spaces/' + spaceId, 'DELETE', null)
        if (response.ok) {
            navigate(-1);
            alert('Space deleted')
        } else {
            setMsg(await response.text());
        }
    };

    useEffect(() => {
        fetchSpace();
        fetchShares();
    }, []);

    return (
        <div>
            <div className="left-div">
                <br />
                <a href="#" onClick={(e) => { e.preventDefault(); navigate(-1); }}>{'<< '}Back</a>
                <hr />
                <a href="#" onClick={(e) => { e.preventDefault(); navigate(`/space/${spaceId}/members`); }}>Members</a>
                <hr />
                <div>
                    <textarea
                        type="text"
                        placeholder="Enter your text here..."
                        rows="5"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
                <button onClick={createShare} disabled={loading}>Create share</button>
                <hr />
                <div>
                    <input
                        placeholder="New name for space..."
                        type="text"
                        value={spaceNewName}
                        onChange={(e) => setSpaceNewName(e.target.value)}
                    />
                    <button onClick={renameSpace} disabled={loading}>Rename space</button>
                </div>
                <hr />
                <button onClick={deleteSpace} disabled={loading}>Delete this space</button>
                <hr />
            </div>
            <div className="right-div">
                <h3>{space.name}</h3>
                {shares.map((item) => {
                    return <Share share={item} fetchShares={fetchShares} loading={loading} key={item.id} />
                })}
            </div>
        </div>
    );
}

export default Space;