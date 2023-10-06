import { useState } from 'react';
import { makeShareRequest } from "../../../Helper"
import Config from '../../../Config';

function EditShareBody({ setEdit, setMsg, share, fetchShares, setClassN }) {
    const [fileName, setFileName] = useState('');
    const [text, setText] = useState(share.text);
    const [file, setFile] = useState();
    function closeEditor() { setEdit(false) }

    function handleFileChange(event) {
        setFile(event.target.files[0]);
        if (event.target.files[0]) {
            setFileName(event.target.files[0].name)
        }
    };

    async function updateShare() {
        setMsg(Config.waitMsg)
        let bodyContent = new FormData()
        bodyContent.append("text", text)
        if (file) { bodyContent.append("file", file) }
        bodyContent.append("file", file);
        let response = await makeShareRequest('/shares/' + share.id, 'PUT', bodyContent)
        if (response.ok) {
            fetchShares()
            closeEditor()
            setClassN('share div-flex-basic color-change-animation')
            setTimeout(() => {
                fetchShares();
            }, 500);
        } else {
            setMsg(await response.text())
        }
    }

    return (
        <div className='div-flex-basic'>
            <div className='share-content-container'>
                <textarea
                    className='text-align-left'
                    type="text"
                    rows="5"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    name='edit-share'
                />
                <input
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    onChange={handleFileChange}
                    id="fileInputEdit"
                    className='file-input'
                />
                <label htmlFor="fileInputEdit" className="file-upload">
                    Choose a new photo 📷
                </label>
                <span className='chosen-image-edit'> {fileName}</span>
            </div>
            <div className='div-flex'>
                <button onClick={updateShare} >Update</button>
                <br />
                <button onClick={closeEditor} >Cancel</button>
            </div>
        </div>
    );
}

export default EditShareBody