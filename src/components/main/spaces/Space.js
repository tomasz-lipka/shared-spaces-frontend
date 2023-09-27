import { useNavigate, useParams, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Share from "../shares/Share"
import { makeRequest } from "../../../Helper"
import Config from '../../../Config';
import CreateShare from './CreateShare';
import PhotoAndMembersNav from './PhotoAndMembersNav';
import SidebarLine from '../SidebarLine';
import RenameSpace from './RenameSpace';

function Space({ setMsg }) {
    const navigate = useNavigate()
    const { spaceId } = useParams();
    const [space, setSpace] = useState('');
    const [shares, setShares] = useState([]);


    async function fetchSpace() {
        setMsg(Config.waitMsg)
        let response = await makeRequest('/spaces/' + spaceId, 'GET', null)
        if (response.ok) {
            setSpace(await response.json());
            setMsg(Config.blankMsg)
        } else {
            setMsg(await response.text())
        }
    };

    async function fetchShares() {
        setMsg(Config.waitMsg)
        let response = await makeRequest('/spaces/' + spaceId + '/shares', 'GET', null)
        if (response.ok) {
            setShares(await response.json());
            setMsg(Config.blankMsg)
        } else {
            setMsg(await response.text())
        }
    };



    async function deleteSpace() {
        setMsg(Config.waitMsg)
        let response = await makeRequest('/spaces/' + spaceId, 'DELETE', null)
        if (response.ok) {
            navigate(-1);
            alert('Space deleted')
        } else {
            setMsg(await response.text())
        }
    };

    useEffect(() => {
        fetchSpace();
        fetchShares();
        // eslint-disable-next-line
    }, []);

    return (
        <div className='div-flex-basic'>
            <div className="sidebar">
                <br />
                <PhotoAndMembersNav spaceId={spaceId} />
                <SidebarLine />
                <CreateShare setMsg={setMsg} spaceId={spaceId} fetchShares={fetchShares} />
                <SidebarLine />
                <RenameSpace setMsg={setMsg} spaceId={spaceId} fetchSpace={fetchSpace} />
                <SidebarLine />
                <button onClick={deleteSpace} >Delete space</button>
            </div>
            <div className="content-div">
                <div className='breadcrump-div'>
                    <Link to='/' className='breadcrump'> {Config.titleSymbol} spaces</Link>
                    <Link className='breadcrump'> {Config.titleSymbol} {space.name}</Link>
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