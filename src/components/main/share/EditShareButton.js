import Config from '../../../Config';
import { makeShareRequest } from "../../../Helper"

function EditShareButtons({ file, setMsg, updatedText, share, fetchShares, setEdit }) {

    async function updateShare() {
        setMsg(Config.waitMsg)
        let bodyContent = new FormData()
        bodyContent.append("text", updatedText)
        if (file) { bodyContent.append("file", file) }
        bodyContent.append("file", file);
        let response = await makeShareRequest('/shares/' + share.id, 'PUT', bodyContent)
        if (response.ok) {
            fetchShares()
            closeEditor()
        } else {
            setMsg(await response.text())
        }
    }

    function closeEditor() { setEdit(false) }

    return (
        <div>
            <button onClick={updateShare} >Update</button>
            <br />
            <button onClick={closeEditor} >Cancel</button>
        </div>
    );
}

export default EditShareButtons