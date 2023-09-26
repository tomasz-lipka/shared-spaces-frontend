import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Share from "./Share"
import { makeRequest, makeShareRequest } from "../Helper"
import Config from '../Config';

function Space({ setMsg }) {
    const navigate = useNavigate()
    const { spaceId } = useParams();
    const [space, setSpace] = useState('');
    const [text, setText] = useState('');
    const [shares, setShares] = useState([]);
    const [spaceNewName, setSpaceNewName] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);


    async function fetchSpace() {
        setMsg(Config.waitMsg)
        let response = await makeRequest('/spaces/' + spaceId, 'GET', null)
        if (response.ok) {
            setSpace(await response.json());
            setMsg(Config.blankMsg)
        } else {
            setMsg(await response.text())
        }
    };

    async function fetchShares() {
        setMsg(Config.waitMsg)
        let response = await makeRequest('/spaces/' + spaceId + '/shares', 'GET', null)
        if (response.ok) {
            setShares(await response.json());
            setMsg(Config.blankMsg)
        } else {
            setMsg(await response.text())
        }
    };

    async function createShare() {
        setMsg(Config.waitMsg)

        let bodyContent = new FormData();
        bodyContent.append("text", text);
        // bodyContent.append("file", "/workspaces/shared-spaces/project/test/test-image.jpg");

        let response = await makeShareRequest('/spaces/' + spaceId + '/shares', 'POST', bodyContent)
        if (response.ok) {
            fetchShares();
            setText('')
        } else {
            setMsg(await response.text())
        }
    }

    async function renameSpace() {
        setMsg(Config.waitMsg)
        let requestBody = JSON.stringify({
            "new-name": spaceNewName
        });
        let response = await makeRequest('/spaces/' + spaceId, 'PUT', requestBody);
        if (response.ok) {
            fetchSpace();
            setSpaceNewName('')
        } else {
            setMsg(await response.text())
        }
    };

    async function deleteSpace() {
        setMsg(Config.waitMsg)
        let response = await makeRequest('/spaces/' + spaceId, 'DELETE', null)
        if (response.ok) {
            navigate(-1);
            alert('Space deleted')
        } else {
            setMsg(await response.text())
        }
    };

    function handleFileChange(event) {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    useEffect(() => {
        fetchSpace();
        fetchShares();
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <div className="left-div">
                <br />
                <a href="#/" onClick={(e) => { e.preventDefault(); navigate(-1); }}>{'<< '}Back</a>
                <hr />
                <a href="#/" onClick={(e) => { e.preventDefault(); navigate(`/spaces/${spaceId}/members`); }}>Members</a>
                <hr />
                <div>
                    <textarea
                        type="text"
                        placeholder="Enter your text here..."
                        rows="5"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <input
                        type="file"
                        accept=".jpg, .jpeg, .png"
                        onChange={handleFileChange}
                    />
                </div>
                <button onClick={createShare} >Create share</button>
                <hr />
                <div>
                    <input
                        placeholder="New name for space..."
                        type="text"
                        value={spaceNewName}
                        onChange={(e) => setSpaceNewName(e.target.value)}
                    />
                    <br />
                    <button onClick={renameSpace} >Rename space</button>
                </div>
                <hr />
                <button onClick={deleteSpace} >Delete this space</button>
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