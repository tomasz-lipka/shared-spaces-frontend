import React, { useState } from 'react';
import { makeShareRequest } from "../../../Helper"
import Config from '../../../Config';
import TextPhotoInput from './TextPhotoInput';

function CreateShare({ setMsg, spaceId, fetchShares }) {
    const [text, setText] = useState('');
    const [file, setFile] = useState(null);
    const [defaultFileName, setDefaultFileName] = useState('');

    async function createShare() {
        setMsg(Config.waitMsg)
        let bodyContent = new FormData();
        bodyContent.append("text", text);
        if (file) { bodyContent.append("file", file) }
        let response = await makeShareRequest('/spaces/' + spaceId + '/shares', 'POST', bodyContent)
        if (response.ok) {
            fetchShares()
            setFile(null)
            setDefaultFileName(Config.blankMsg)
            setText('')
        } else {
            setMsg(await response.text())
        }
    }

    return (
        <TextPhotoInput
            setFile={setFile}
            text={text}
            setText={setText}
            execute={createShare}
            defaultFileName={defaultFileName} 
            buttonText={'Share'}/>
    );
}
export default CreateShare