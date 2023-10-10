import { makeRequest } from '../../../Helper';
import Config from '../../../Config';

function BasicShareBody({ setMsg, share, setClassN, fetchShares, setEdit }) {
    const showButtons = sessionStorage.getItem('currentUser') === share.user.login;

    async function deleteShare(shareId) {
        setMsg(Config.waitMsg);
        let response = await makeRequest('/shares/' + shareId, 'DELETE', null);
        if (response.ok) {
            setClassN('share-tile flex-container fade-out');
            setTimeout(() => {
                fetchShares();
            }, 500);
        } else {
            setMsg(await response.text())
        }
    };

    return (
        <div className='flex-container'>
            <div className='share-content-container'>
                {share.text}
                <br />
                {share.image_url && (
                    <img src={share.image_url} alt='Attached to the share' />
                )}
            </div>
            <div className='share-button-container'>
                {showButtons && (
                    <div>
                        <button id='share-button' onClick={() => setEdit(true)}>✎</button>
                        <br />
                        <button id='share-button' onClick={() => deleteShare(share.id)}>✕</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default BasicShareBody;