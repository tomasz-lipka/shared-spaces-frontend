import { makeRequest } from "../../../Helper"
import Config from '../../../Config';

function RegularShareButtons({share, setEdit, setClassN, setMsg, fetchShares}) {

    async function deleteShare(shareId) {
        setMsg(Config.waitMsg)
        let response = await makeRequest('/shares/' + shareId, 'DELETE', null)
        if (response.ok) {
            setClassN('share div-flex-basic fade-out')
            setTimeout(() => {
                fetchShares();
            }, 1000);
        } else { setMsg(await response.text()) }
    };

    return (
        <div><button onClick={() => setEdit(true)}>Edit</button>
        <br />
        <button onClick={() => deleteShare(share.id)}>Delete</button></div>
    );
}
export default RegularShareButtons