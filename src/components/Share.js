import React, { useState } from 'react';
import { format } from "date-fns";
import { makeRequest } from "../Helper"
import Config from '../Config';
import EditShare from './EditShare';

function Share({ share, fetchShares, setMsg }) {

    const formattedTimestamp = format(new Date(share.timestamp), "dd/MM/yyyy HH:mm");
    const showButtons = sessionStorage.getItem("currentUser") === share.user.login;
    const [edit, setEdit] = useState(false)

    async function deleteShare(shareId) {
        setMsg(Config.waitMsg)
        let response = await makeRequest('/shares/' + shareId, 'DELETE', null)
        response.ok ? fetchShares() : setMsg(await response.text())
    };

    return (
        <div className="share" key={share.id}>
            <div className="left-div-flex">
                <p><b>{share.user.login}</b></p>
                <p>{formattedTimestamp}</p>
            </div>
            <div className="right-div-flex">
                {showButtons && !edit ? (
                    <div>
                        <button onClick={() => setEdit(true)}>Edit</button>
                        <button onClick={() => deleteShare(share.id)}>Delete</button>
                    </div>
                ) : null}
                {!edit ? (
                    <p>{share.text}</p>
                ) : (
                    <EditShare originalText={share.text} shareId={share.id} setMsg={setMsg} setEdit={setEdit} />
                )}
            </div>
        </div>
    );
}

export default Share;