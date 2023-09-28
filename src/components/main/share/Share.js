import React, { useState } from 'react';
import { format } from "date-fns";
import { makeRequest } from "../../../Helper"
import Config from '../../../Config';
import EditShare from './EditShare';
import ShareContent from './ShareContent';

function Share({ share, fetchShares, setMsg }) {
    const formattedTimestamp = format(new Date(share.timestamp), "dd.MM HH:mm");
    const showButtons = sessionStorage.getItem("currentUser") === share.user.login;
    const [edit, setEdit] = useState(false)
    const [classN, setClassN] = useState('share div-flex-basic')

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
        <div className={classN} key={share.id}>
            <div className="div-flex">
                <p><b>{share.user.login}</b></p>
                <p>{formattedTimestamp}</p>
            </div>
            <div className="share-content-container">
                {!edit ? (
                    <ShareContent share={share}/>
                ) : (
                    <EditShare originalText={share.text} shareId={share.id} setMsg={setMsg} setEdit={setEdit} fetchShares={fetchShares} />
                )}
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
