import React, { useState } from 'react';
import { format } from 'date-fns';
import EditShareBody from './EditShareBody';
import BasicShareBody from './BasicShareBody';

function Share({ share, fetchShares, setMsg }) {
    const date = new Date(share.timestamp);
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    const formattedTimestamp = format(date, 'dd/MM HH:mm');

    const [edit, setEdit] = useState(false);
    const [classN, setClassN] = useState('share-tile');

    return (
        <div className={classN} key={share.id}>
            <div>
                <b>{share.user.login}</b>
                <br />
                <small>{formattedTimestamp}</small>
                <br />
            </div>
            <div className='margin-top'>
                {edit ? (
                    <EditShareBody
                        setEdit={setEdit}
                        setMsg={setMsg}
                        share={share}
                        fetchShares={fetchShares}
                    />
                ) : (
                    <BasicShareBody
                        setMsg={setMsg}
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

export default Share;
