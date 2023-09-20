import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
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
    const [deleteMsg, setDeleteMsg] = useState('');
    const [shares, setShares] = useState([]);
    const [name, setName] = useState('');

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

    const deleteSpace = async () => {
        const response = await fetch(config.apiUrl + '/spaces/' + id , {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${sessionStorage.getItem("access_token")}`
            },
        });
        if (response.ok) {
            await response;
            alert('Space deleted')
            navigate(-1);
        } else {
            const errorMessage = await response.text();
            setDeleteMsg(errorMessage);
        }
    };
    const renameSpace = async () => {
        const response = await fetch(config.apiUrl + '/spaces/' + id , {
            method: 'PUT',
            body: JSON.stringify({
                "new-name": name
              }),
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${sessionStorage.getItem("access_token")}`
            },
            
        });
        if (response.ok) {
            await response;

            fetchSpace();
        } 
    };


    useEffect(() => {
        setMsg('')
        setDeleteMsg('')
        fetchSpace();
        fetchShares();
    }, []);


    return (
        <div>
            <div className="left-div">
                <br />
                <a href="#" onClick={(e) => { e.preventDefault(); navigate(-1); }}>{'<<'}Go back</a>
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
                <a href="#" onClick={(e) => { e.preventDefault(); navigate(`/space/${id}/members`); }}>Members</a>
                <hr />
                <div>
                    <h4>Rename space</h4>
                    <input
                        placeholder="Enter new name..."
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button onClick={renameSpace} >

 

                    Rename
                </button>
                </div>
                
                <hr />
                <button onClick={deleteSpace} >Delete this space</button>
                <p>{deleteMsg}</p>
                <hr />

                

            </div>
            <div className="right-div">
                <h3>{space.name}</h3>
                <p>{fetchLoading ? 'Loading...' : '\u00A0'}</p>
                {shares.map((value) => {
                    return <Share value={value} fetchShares={fetchShares} fetchLoading={fetchLoading} />
                })}
            </div>
        </div>
    );
}

export default Space;