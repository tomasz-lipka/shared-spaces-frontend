import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Share from "./Share"
import { makeRequest, makeShareRequest } from "../Helper"

function Space({ setMsg }) {
    const navigate = useNavigate()
    const { spaceId } = useParams();
    const [loading, setLoading] = useState(false);
    const [space, setSpace] = useState('');
    const [text, setText] = useState('');
    const [shares, setShares] = useState([]);
    const [spaceNewName, setSpaceNewName] = useState('');

    function startFunction() {
        setMsg('Please wait...')
        setLoading(true)
    }

    function endFunctionOk() {
        setMsg('\u00A0');
        setLoading(false);
    }

    const endFunctionErr = async (response) => {
        setMsg(await response.text());
        setLoading(false);
    }

    const fetchSpace = async () => {
        startFunction();
        let response = await makeRequest('/spaces/' + spaceId, 'GET', null)
        if (response.ok) {
            setSpace(await response.json());
            endFunctionOk();
        } else {
            endFunctionErr(response)
        }
    };

    const fetchShares = async () => {
        startFunction()
        let response = await makeRequest('/spaces/' + spaceId + '/shares', 'GET', null)
        if (response.ok) {
            setShares(await response.json());
            endFunctionOk();
        } else {
            endFunctionErr(response);
        }
    };

    const createShare = async () => {
        startFunction()

        let bodyContent = new FormData();
        bodyContent.append("text", text);
        // bodyContent.append("file", "/workspaces/shared-spaces/project/test/test-image.jpg");

        let response = await makeShareRequest('/spaces/' + spaceId + '/shares', 'POST', bodyContent)
        if (response.ok) {
            fetchShares();
            setText('')
        } else {
            endFunctionErr(response);
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
            setSpaceNewName('')
        } else {
            endFunctionErr(response);
        }
    };

    const deleteSpace = async () => {
        startFunction()
        let response = await makeRequest('/spaces/' + spaceId, 'DELETE', null)
        if (response.ok) {
            navigate(-1);
            alert('Space deleted')
        } else {
            endFunctionErr(response);
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
                <a href="#" onClick={(e) => { e.preventDefault(); navigate(`/spaces/${spaceId}/members`); }}>Members</a>
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
                    <br />
                    <button onClick={renameSpace} disabled={loading}>Rename space</button>
                </div>
                <hr />
                <button onClick={deleteSpace} disabled={loading}>Delete this space</button>
                <hr />
            </div>
            <div className="right-div">
                <h3>{space.name}</h3>
                {shares.length === 0 ? (<p>No shares</p>) : (
                    shares.map((item) => (
                        <Share share={item} fetchShares={fetchShares} setMsg={setMsg} key={item.id} />
                    ))
                )}
            </div>
        </div>
    );
}

export default Space;