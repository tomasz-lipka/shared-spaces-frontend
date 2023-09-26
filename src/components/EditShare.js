import React, { useState } from 'react';
import Config from '../Config';
import { makeShareRequest } from "../Helper"


function EditShare({ originalText, shareId, setMsg, setEdit, fetchShares }) {

    const [text, setText] = useState(originalText);
    const [file, setFile] = useState(null);


    async function updateShare() {
        setMsg(Config.waitMsg)
        let bodyContent = new FormData()
        bodyContent.append("text", text)
        if (file) { bodyContent.append("file", file) }
        bodyContent.append("file", file);
        let response = await makeShareRequest('/shares/' + shareId, 'PUT', bodyContent)
        if (response.ok) {
            fetchShares()
            closeEditor()
        } else {
            setMsg(await response.text())
        }
    }

    function closeEditor() { setEdit(false) }

    function handleFileChange(event) {
        setFile(event.target.files[0]);
    };

    return ( 
        <div>
            <div className='div-flex-basic'>
                <div className='div-flex'>
                    <textarea
                        type="text"
                        placeholder="Enter your text here..."
                        rows="5"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
                <div className='div-flex'>
                    <input
                        type="file"
                        accept=".jpg, .jpeg, .png"
                        onChange={handleFileChange}
                    />
                    <button onClick={updateShare} >Update</button>
                    <br />
                    <button onClick={closeEditor} >Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default EditShare