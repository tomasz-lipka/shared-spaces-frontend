import { useState } from 'react';
import { format } from 'date-fns';
import EditShareBody from './EditShareBody';
import BasicShareBody from './BasicShareBody';

function Share({ share, fetchShares, setMsg }) {
    const formattedTimestamp = format(new Date(share.timestamp), 'dd/MM HH:mm');
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
    );
}

export default Share;
