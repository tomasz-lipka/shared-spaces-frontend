import React from 'react';
import { makeRequest } from '../../../Helper';
import Config from '../../../Config';

function BasicShareBody({ setMsg, share, setClassN, fetchShares, setEdit }) {
    const showButtons = sessionStorage.getItem('currentUser') === share.user.login;

    async function deleteShare(shareId) {
        const confirmed = window.confirm('Are you sure you want to delete this share?');
        if (confirmed) {
            setMsg(Config.waitMsg);
            let response = await makeRequest('/shares/' + shareId, 'DELETE', null);
            if (response.ok) {
                setClassN('share-tile fade-out');
                setTimeout(() => {
                    fetchShares();
                }, 500);
            } else {
                setMsg(await response.text())
            }
        }
    };

    return (
        <div>
            {share.text}
            <br />
            {share.image_url && (
                <img src={share.image_url} alt='Attached to the share' />
            )}
            <div className='margin-top'>
                {showButtons && (
                    <div>
                        <button id='share-button' onClick={() => setEdit(true)}>
                            <span role='img' aria-label='Edit'>✎</span>
                        </button>
                        <button id='share-button' onClick={() => deleteShare(share.id)}>
                            <span role='img' aria-label='Delete'>⌫</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default BasicShareBody;