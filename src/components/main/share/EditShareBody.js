import React, { useState } from 'react';
import { makeShareRequest } from '../../../Helper';
import Config from '../../../Config';

function EditShareBody({ setEdit, setMsg, share, fetchShares }) {
    const [fileName, setFileName] = useState('');
    const [text, setText] = useState(share.text);
    const [file, setFile] = useState();

    function closeEditor() {
        setEdit(false);
    };

    function handleFileChange(event) {
        setFile(event.target.files[0]);
        if (event.target.files[0]) {
            setFileName(event.target.files[0].name);
        }
    };

    async function updateShare() {
        setMsg(Config.waitMsg);
        let bodyContent = new FormData();
        bodyContent.append('text', text);
        if (file) {
            bodyContent.append('file', file);
        }
        bodyContent.append('file', file);
        let response = await makeShareRequest('/shares/' + share.id, 'PUT', bodyContent);
        if (response.ok) {
            fetchShares();
            closeEditor();
            fetchShares();
        } else {
            setMsg(await response.text());
        }
    };

    return (
        <div >
            <textarea
                className='margin-top'
                type='text'
                rows='5'
                value={text}
                onChange={(e) => setText(e.target.value)}
                name='edit-share'
            />
            <br />
            <input
                type='file'
                accept='.jpg, .jpeg, .png'
                onChange={handleFileChange}
                id='fileInputEdit'
                className='default-file-input'
            />
            <label htmlFor='fileInputEdit' className='custom-file-input'>
                New image 📷
            </label>
            <br />
            <span className='chosen-file-edit'> {fileName}</span>
            <br />
            <button id='share-button' onClick={updateShare} >✓</button>
            <button id='share-button' onClick={closeEditor} >✕</button>
        </div>
    );
}

export default EditShareBody;