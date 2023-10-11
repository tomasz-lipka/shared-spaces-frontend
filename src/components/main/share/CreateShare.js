import { useState } from 'react';
import { makeShareRequest } from '../../../Helper'
import Config from '../../../Config';

function CreateShare({ setMsg, spaceId, fetchShares }) {
    const [text, setText] = useState('');
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');

    function handleFileChange(event) {
        setFile(event.target.files[0]);
        if (event.target.files[0]) {
            setFileName(event.target.files[0].name);
        }
    };

    async function createShare() {
        setMsg(Config.waitMsg);
        let bodyContent = new FormData();
        bodyContent.append('text', text);
        if (file) {
            bodyContent.append('file', file)
        }
        let response = await makeShareRequest('/spaces/' + spaceId + '/shares', 'POST', bodyContent);
        // start TODO
        console.log('*START*')
        console.log(await response.json())
        console.log('*END*')
        // end TODO
        if (response.ok) {
            fetchShares();
            setFile(null);
            setFileName('');
            setText('');
        } else {
            setMsg(await response.text());
        }
    };

    return (
        <div className='sidebar-box'>
            <div>
                <textarea
                    type='text'
                    value={text}
                    placeholder='What do you want to share with your space?'
                    rows='5'
                    onChange={(e) => setText(e.target.value)}
                    name='create-share'
                />
                <input
                    type='file'
                    accept='.jpg, .jpeg, .png'
                    onChange={handleFileChange}
                    id='fileInput'
                    className='default-file-input'
                />
                <label htmlFor='fileInput' className='custom-file-input'>
                    Add image 📷
                </label>
                <br />
                <span className='chosen-file'>{fileName}</span>
            </div>
            <button className='margin-top' onClick={createShare} >Share</button>
        </div>
    );
}

export default CreateShare;