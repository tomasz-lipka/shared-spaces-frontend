import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Share from '../share/Share';
import { makeRequest } from '../../../Helper';
import Config from '../../../Config';
import CreateShare from '../share/CreateShare';
import SpaceSidebarNav from '../SpaceSidebarNav';

function Space({ setMsg }) {
    const { spaceId } = useParams();
    const [shares, setShares] = useState([]);

    async function fetchShares() {
        setMsg(Config.waitMsg);
        let response = await makeRequest('/spaces/' + spaceId + '/shares', 'GET', null);
        if (response.ok) {
            setShares(await response.json());
            setMsg(Config.blankSymbol);
        } else {
            setMsg(await response.text());
        }
    };

    function renderNoShares() {
        return <p>No shares</p>;
    };

    function renderShares() {
        return shares.map((item) => (
            <Share share={item} fetchShares={fetchShares} setMsg={setMsg} key={item.id} />
        ));
    };

    function renderContent() {
        return shares.length === 0 ? renderNoShares() : renderShares();
    };

    useEffect(() => {
        fetchShares();
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <aside>
                <div className='min-height'>
                    <SpaceSidebarNav spaceId={spaceId} />
                    <CreateShare setMsg={setMsg} spaceId={spaceId} fetchShares={fetchShares} />
                </div>
            </aside>
            <div className='content-container'>
                {renderContent()}
            </div>
        </div>
    );
}

export default Space;