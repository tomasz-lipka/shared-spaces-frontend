import React from 'react';
import { format } from "date-fns";
import { makeRequest } from "../Helper"
import Config from '../Config';

function Share({ share, fetchShares, setMsg }) {

    const formattedTimestamp = format(new Date(share.timestamp), "dd/MM/yyyy HH:mm");
    const showButton = sessionStorage.getItem("currentUser") === share.user.login;

    const deleteShare = async (shareId) => {
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
                {showButton && (
                    <button
                        onClick={() => deleteShare(share.id)}>Delete</button>
                )}
                <p>{share.text}</p>
            </div>
        </div>
    );
}

export default Share;