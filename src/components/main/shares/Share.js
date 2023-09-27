import React, { useState } from 'react';
import { format } from "date-fns";
import { makeRequest } from "../../../Helper"
import Config from '../../../Config';
import EditShare from './EditShare';

function Share({ share, fetchShares, setMsg }) {
    const formattedTimestamp = format(new Date(share.timestamp), "dd.MM HH:mm");
    const showButtons = sessionStorage.getItem("currentUser") === share.user.login;
    const [edit, setEdit] = useState(false)

    async function deleteShare(shareId) {
        setMsg(Config.waitMsg)
        let response = await makeRequest('/shares/' + shareId, 'DELETE', null)
        response.ok ? fetchShares() : setMsg(await response.text())
    };

    return (
        <div className="share" key={share.id}>
            <div className="share-title-div">
                <p><b>{share.user.login}</b></p>
                <p>{formattedTimestamp}</p>
            </div>
            <div className="div-flex">
                {!edit ? (
                    <div className="div-flex">
                        <div  >
                            {share.image_url && (
                                <img src={share.image_url} alt='Attached to the share' className='share-image' />
                            )}
                        </div>
                        <div >
                            <p>{share.text}</p>
                        </div>
                    </div>
                ) : (
                    <EditShare originalText={share.text} shareId={share.id} setMsg={setMsg} setEdit={setEdit} fetchShares={fetchShares} />
                )}
            </div>
            <div >
            </div>
            <div className="div-flex">
                {showButtons && !edit && (
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

export default Share
