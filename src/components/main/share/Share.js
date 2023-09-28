import React, { useState } from 'react';
import { format } from "date-fns";
import EditShareBody from './EditShareBody';
import BasicShareBody from './BasicShareBody';

function Share({ share, fetchShares, setMsg }) {
    const formattedTimestamp = format(new Date(share.timestamp), "dd.MM HH:mm");
    const [edit, setEdit] = useState(false)
    const [classN, setClassN] = useState('share div-flex-basic')

    return (
        <div className={classN} key={share.id}>
            <div className="div-flex">
                <p><b>{share.user.login}</b></p>
                <p>{formattedTimestamp}</p>
            </div>
            <div className="share-content-container">
                {edit ? (
                    <EditShareBody
                        setEdit={setEdit}
                        setMsg={setMsg}
                        share={share}
                        fetchShares={fetchShares}
                        setClassN={setClassN}
                    />
                ) : (
                    <BasicShareBody setMsg
                        share={share}
                        setClassN={setClassN}
                        fetchShares={fetchShares}
                        setEdit={setEdit}
                    />
                )}
            </div>
        </div>
    );
}

export default Share
