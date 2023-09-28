import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Member from "./Member"
import { makeRequest } from "../../../Helper"
import Config from '../../../Config';
import AddMember from './AddMember';
import Breadcrumb from '../Breadcrumb';

function Members({ setMsg }) {
    const { spaceId } = useParams();
    const [space, setSpace] = useState('');
    const [members, setMembers] = useState([]);

    async function fetchSpace() {
        setMsg(Config.waitMsg);
        let response = await makeRequest('/spaces/' + spaceId, 'GET', null)
        if (response.ok) {
            setSpace(await response.json());
            setMsg(Config.blankMsg);
        } else {
            setMsg(await response.text());
        }
    };

    async function fetchMembers() {
        setMsg(Config.waitMsg);
        let response = await makeRequest('/spaces/' + spaceId + '/members', 'GET', null)
        if (response.ok) {
            setMembers(await response.json());
            setMsg(Config.blankMsg);
        } else {
            setMsg(await response.text());
        }
    };

    useEffect(() => {
        fetchSpace();
        fetchMembers();
        // eslint-disable-next-line
    }, []);

    return (
        <div className='div-flex-basic'>
            <div className="sidebar">
                <br />
                <AddMember setMsg={setMsg} spaceId={spaceId} fetchMembers={fetchMembers} />
            </div>
            <div className="content-div">
                <div className='breadcrumb-div'>
                    <Breadcrumb to={'/'} display={'spaces'} />
                    <Breadcrumb to={'/spaces/' + spaceId} display={space.name} />
                    <Breadcrumb to={''} display={'members'} />
                </div>
                {members.map((item) => {
                    return <Member member={item} fetchMembers={fetchMembers} spaceId={spaceId}
                        key={item.user.id} setMsg={setMsg} />
                })}
            </div>
        </div >
    );
}

export default Members