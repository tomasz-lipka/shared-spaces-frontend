import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import config from '../config';
import { format } from "date-fns";

function Space() {
    const { id } = useParams();
    const navigate = useNavigate()
    const [space, setSpace] = useState('');
    const [text, setText] = useState('');
    const [createLoading, setCreateLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [deleteLoading, setDeleteLoading] = useState(false);
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
        }
    };

    const deleteShare = async (shareId) => {
        setDeleteLoading(true)
        const response = await fetch(config.apiUrl + '/shares/' + shareId, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${sessionStorage.getItem("access_token")}`
            },
        });
        if (response.ok) {
            await response;
            fetchShares();
        }
    };

    const setFetchLoadingFalse = () => {
        setFetchLoading(false)
    }

    useEffect(() => {
        fetchSpace();
        fetchShares();
        // setFetchLoading(false)
    }, []);

    // useEffect(() => {
    //     setDeleteLoading(false);

    // });

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
                <button onClick={createShare}>
                    {createLoading ? 'Creating...' : 'Create share'}
                </button>
                <p>{msg}</p>
                <hr />
            </div>
            <div className="right-div">
                <h3>Space: {space.name}</h3>
                <p>{fetchLoading ? 'Loading...' : ''}</p>
                <p>{deleteLoading ? 'Deleting...' : ''}</p>
                {shares.map((value) => {
                    const formattedTimestamp = format(new Date(value.timestamp), "dd/MM/yyyy HH:mm");
                    const showButton = sessionStorage.getItem("currentUser") === value.user.login;
                    return (
                        <div className="share" key={value.id}>
                            <div className="left-div-flex">
                                <p><b>{value.user.login}</b></p>
                                <p>{formattedTimestamp}</p>
                            </div>
                            <div className="right-div-flex">
                                {showButton && (
                                    <button
                                        onClick={() => deleteShare(value.id)}>Delete</button>
                                )}
                                <p>{value.text}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Space;