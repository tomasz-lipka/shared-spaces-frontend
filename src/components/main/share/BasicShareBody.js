import { makeRequest } from "../../../Helper"
import Config from '../../../Config';

function BasicShareBody({ setMsg, share, setClassN, fetchShares, setEdit }) {
    const showButtons = sessionStorage.getItem("currentUser") === share.user.login;

    async function deleteShare(shareId) {
        setMsg(Config.waitMsg)
        let response = await makeRequest('/shares/' + shareId, 'DELETE', null)
        if (response.ok) {
            setClassN('share div-flex-basic fade-out')
            setTimeout(() => {
                fetchShares();
            }, 500);
        } else { setMsg(await response.text()) }
    };

    return (
        <div className="div-flex-basic">
            <div className="share-content-container">
                <div className="share-content">
                    {share.image_url && (
                        <img src={share.image_url} alt='Attached to the share' className='share-image' />
                    )}
                </div>
                <div className="share-content">
                    <p>{share.text}</p>
                </div>
            </div>
            <div className="div-flex">{ }
                {showButtons && (
                    <div>
                        <button onClick={() => setEdit(true)}>Edit</button>
                        <br />
                        <button onClick={() => deleteShare(share.id)}>Delete</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default BasicShareBody