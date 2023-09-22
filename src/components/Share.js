import { format } from "date-fns";
import { makeRequest } from "../Helper"
import React, { useState } from 'react';

function Share({ share, fetchShares, setMsg }) {

    const formattedTimestamp = format(new Date(share.timestamp), "dd/MM/yyyy HH:mm");
    const showButton = sessionStorage.getItem("currentUser") === share.user.login;
    const [loading, setLoading] = useState(false);

    const deleteShare = async (shareId) => {
        setMsg('Please wait...')
        setLoading(true)
        await makeRequest('/shares/' + shareId, 'DELETE', null)
        fetchShares();
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
                        onClick={() => deleteShare(share.id)} disabled={loading}>Delete</button>
                )}
                <p>{share.text}</p>
            </div>
        </div>
    );
}

export default Share;