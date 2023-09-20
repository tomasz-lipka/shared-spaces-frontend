import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import config from '../config';
import Share from "./Share"

function Space() {
    const { id } = useParams();
    const navigate = useNavigate()
    const [space, setSpace] = useState('');
    const [text, setText] = useState('');
    const [createLoading, setCreateLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(false);
    const [msg, setMsg] = useState('');
    const [shares, setShares] = useState([]);

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

    const createShare = async () => {
        let bodyContent = new FormData();
        bodyContent.append("text", text);
        // bodyContent.append("file", "/workspaces/shared-spaces/project/test/test-image.jpg");

        setMsg('')
        setCreateLoading(true);
        const response = await fetch(config.apiUrl + '/spaces/' + id + '/shares', {
            method: 'POST',
            body: bodyContent,
            headers: {
                "Accept": "*/*",
                authorization: `Bearer ${sessionStorage.getItem("access_token")}`
            },
        });
        if (response.ok) {
            fetchShares();
        } else {
            const errorMessage = await response.text();
            setMsg(errorMessage);
            setCreateLoading(false);
        }
    }

    const fetchShares = async () => {
        setFetchLoading(true)
        const response = await fetch(config.apiUrl + '/spaces/' + id + '/shares', {
            method: 'GET',
            headers: {
                authorization: `Bearer ${sessionStorage.getItem("access_token")}`
            },
        });
        if (response.ok) {
            const data = await response.json();
            setShares(data);
            setCreateLoading(false);
            setFetchLoading(false)
        }
    };


    useEffect(() => {
        fetchSpace();
        fetchShares();
    }, []);


    return (
        <div>
            <div className="left-div">
                <button onClick={() => navigate(-1)}>Go back</button>
                <hr />
                <div>
                    <h4>New share</h4>
                    <textarea
                        type="text"
                        placeholder="Enter your text here..."
                        rows="5"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
                <button onClick={createShare} disabled={createLoading}>
                    {createLoading ? 'Creating...' : 'Create share'}
                </button>
                <p>{msg}</p>
                <hr />
            </div>
            <div className="right-div">
                <h3>Space: {space.name}</h3>
                <p>{fetchLoading ? 'Loading...' : '\u00A0'}</p>
                {shares.map((value) => {
                    return <Share value={value} fetchShares={fetchShares} fetchLoading={fetchLoading} />
                })}
            </div>
        </div>
    );
}

export default Space;