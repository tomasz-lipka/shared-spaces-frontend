import React, { useState } from 'react';
import Config from '../Config';
import { makeShareRequest } from "../Helper"


function EditShare({ originalText, shareId, setMsg, setEdit }) {

    const [text, setText] = useState(originalText);

    async function updateShare() {
        setMsg(Config.waitMsg)
        let bodyContent = new FormData();
        bodyContent.append("text", text);
        // bodyContent.append("file", "/workspaces/shared-spaces/project/test/test-image.jpg");
        let response = await makeShareRequest('/shares/' + shareId, 'PUT', bodyContent)
        response.ok ? closeEditor() : setMsg(await response.text())
    }

    function closeEditor() { setEdit(false) }

    return (
        <div>
            <textarea
                type="text"
                placeholder="Enter your text here..."
                rows="5"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <br />
            <button onClick={updateShare} >Update</button>
            <button onClick={closeEditor} >Cancel</button>
        </div>

        // <div>edittt</div>
    );

}

export default EditShare;