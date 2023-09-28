import React, { useState } from 'react';
import { format } from "date-fns";
import EditShare from './EditShare';
import ShareContent from './ShareContent';
import RegularShareButtons from './RegularShareButtons';
import EditShareButtons from './EditShareButton';

function Share({ share, fetchShares, setMsg }) {
    const formattedTimestamp = format(new Date(share.timestamp), "dd.MM HH:mm");
    const showButtons = sessionStorage.getItem("currentUser") === share.user.login;
    const [edit, setEdit] = useState(false)
    const [classN, setClassN] = useState('share div-flex-basic')
    const [file, setFile] = useState(null);
    const [updatedText, setUpdatedText] = useState('');



    return (
        <div className={classN} key={share.id}>
            <div className="div-flex">
                <p><b>{share.user.login}</b></p>
                <p>{formattedTimestamp}</p>
            </div>
            <div className="share-content-container">
                {edit ? (
                    <EditShare
                        originalText={share.text}
                        setFile={setFile}
                        setUpdatedText={setUpdatedText}
                    />
                ) : (
                    <ShareContent share={share} />
                )}
            </div>
            <div className="div-flex">
                {showButtons && (
                    edit ? (
                        <EditShareButtons
                            file={file}
                            setMsg={setMsg}
                            updatedText={updatedText}
                            share={share}
                            fetchShares={fetchShares}
                            setEdit={setEdit}
                        />
                    ) : (
                        <RegularShareButtons
                            share={share}
                            setEdit={setEdit}
                            setClassN={setClassN}
                            setMsg={setMsg}
                            fetchShares={fetchShares}
                        />
                    )
                )}
            </div>
        </div>
    );
}

export default Share
