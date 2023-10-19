import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Share from '../share/Share';
import { makeRequest } from '../../../Helper';
import Config from '../../../Config';
import CreateShare from '../share/CreateShare';
import ImgAndMembersNav from '../ImgAndMembersNav';
import RenameSpace from './RenameSpace';
import DeleteSpace from './DeleteSpace';

function Space({ setMsg }) {
    const { spaceId } = useParams();
    const [shares, setShares] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);

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

    async function setCurrentUserAdmin() {
        let response = await makeRequest('/spaces/' + spaceId + '/members', 'GET', null);
        if (response.ok) {
            let members = await response.json();
            members.forEach((item) => {
                if (item.is_admin && item.user.login === sessionStorage.getItem('currentUser')) {
                    setIsAdmin(true);
                }
            });
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
        setCurrentUserAdmin();
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <aside>
                <div className='min-height'>
                    <ImgAndMembersNav spaceId={spaceId} />
                    <CreateShare setMsg={setMsg} spaceId={spaceId} fetchShares={fetchShares} />
                    <RenameSpace setMsg={setMsg} spaceId={spaceId} isAdmin={isAdmin} />
                    <DeleteSpace setMsg={setMsg} spaceId={spaceId} isAdmin={isAdmin} />
                </div>
            </aside>
            <div className='content-container'>
                {renderContent()}
            </div>
        </div>
    );
}

export default Space;