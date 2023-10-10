import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Share from "../share/Share"
import { makeRequest } from "../../../Helper"
import Config from '../../../Config';
import CreateShare from '../share/CreateShare';
import ImgAndMembersNav from '../ImgAndMembersNav';
import SidebarLine from '../SidebarLine';
import RenameSpace from './RenameSpace';
import DeleteSpace from './DeleteSpace';
import Breadcrumb from '../Breadcrumb';

function Space({ setMsg }) {
    const { spaceId } = useParams();
    const [spaceName, setSpaceName] = useState('...');
    const [shares, setShares] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);

    async function fetchSpaceName() {
        setMsg(Config.waitMsg)
        let response = await makeRequest('/spaces/' + spaceId, 'GET', null)
        if (response.ok) {
            let data = await response.json()
            setSpaceName(data.name);
            setMsg(Config.blankSymbol)
        } else {
            setMsg(await response.text())
        }
    };

    async function fetchShares() {
        setMsg(Config.waitMsg)
        let response = await makeRequest('/spaces/' + spaceId + '/shares', 'GET', null)
        if (response.ok) {
            setShares(await response.json());
            setMsg(Config.blankSymbol)
        } else {
            setMsg(await response.text())
        }
    };

    async function setCurrentUserAdmin() {
        let response = await makeRequest('/spaces/' + spaceId + '/members', 'GET', null)
        if (response.ok) {
            let members = await response.json()
            members.forEach((item) => {
                if (item.is_admin && item.user.login === sessionStorage.getItem("currentUser")) {
                    setIsAdmin(true);
                }
            });
        }
    };

    useEffect(() => {
        fetchSpaceName();
        fetchShares();
        setCurrentUserAdmin();
        // eslint-disable-next-line
    }, []);

    return (
        <div className='flex-container'>
            <div className="sidebar">
                <br />
                <ImgAndMembersNav spaceId={spaceId} />
                <SidebarLine />
                <CreateShare setMsg={setMsg} spaceId={spaceId} fetchShares={fetchShares} />
                <SidebarLine />
                <RenameSpace setMsg={setMsg} spaceId={spaceId} fetchSpace={fetchSpaceName} isAdmin={isAdmin} />
                <SidebarLine />
                <DeleteSpace setMsg={setMsg} spaceId={spaceId} isAdmin={isAdmin} />
            </div>
            <div className="content-container">
                <div className='breadcrumb-container'>
                    <Breadcrumb to={'/'} display={'spaces'} />
                    <Breadcrumb to={''} display={spaceName} reload={fetchShares} />
                </div>
                {shares.length === 0 ? (<p>No shares</p>) : (
                    shares.map((item) => (
                        <Share share={item} fetchShares={fetchShares} setMsg={setMsg} key={item.id} />
                    ))
                )}
            </div>
        </div>
    );
}

export default Space;