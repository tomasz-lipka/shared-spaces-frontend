import { useNavigate, useParams, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Share from "../shares/Share"
import { makeRequest, makeShareRequest } from "../../../Helper"
import Config from '../../../Config';

function Space({ setMsg }) {
    const navigate = useNavigate()
    const { spaceId } = useParams();
    const [space, setSpace] = useState('');
    const [text, setText] = useState('');
    const [shares, setShares] = useState([]);
    const [spaceNewName, setSpaceNewName] = useState('');
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState(null);

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
        if (file) { bodyContent.append("file", file) }
        let response = await makeShareRequest('/spaces/' + spaceId + '/shares', 'POST', bodyContent)
        if (response.ok) {
            fetchShares()
            setText('')
            setFile(null)
            setFileName('')
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
        setFile(event.target.files[0]);
        if (event.target.files[0]) {
            setFileName(event.target.files[0].name)
        }
    };

    useEffect(() => {
        fetchSpace();
        fetchShares();
        // eslint-disable-next-line
    }, []);

    return (
        <div className='div-flex-basic'>
            <div className="sidebar">
                <br />
                <a href="#/" onClick={(e) => { e.preventDefault(); navigate(`/spaces/${spaceId}/members`); }} className='main-menu-item'>
                    Members
                </a>
                <br />
                <br />
                <a href="#/" onClick={(e) => { e.preventDefault(); navigate(`/spaces/${spaceId}/images`); }} className='main-menu-item'>
                    All photos
                </a>
                <br /><br /><hr /><br />
                <div>
                    <textarea
                        type="text"
                        placeholder="What do you want to share with your space?"
                        rows="5"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <input
                        type="file"
                        accept=".jpg, .jpeg, .png"
                        onChange={handleFileChange}
                        id="fileInput"
                    />
                    <label for="fileInput" class="file-upload">
                        Choose a photo 📷
                    </label>
                    <span className='chosen-image'> {fileName}</span>
                </div>
                <button onClick={createShare} >Share</button>
                <br /><br /><hr /><br />
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
                <br /><hr /><br />
                <button onClick={deleteSpace} >Delete space</button>
            </div>
            <div className="content-div">
                <div className='breadcrump-div'>
                    <Link to='/' className='breadcrump'> {Config.titleSymbol} spaces</Link>
                    <Link className='breadcrump'> {Config.titleSymbol} {space.name}</Link>
                </div>
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