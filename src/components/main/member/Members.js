import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Member from "./Member"
import { makeRequest } from "../../../Helper"
import Config from '../../../Config';
import AddMember from './AddMember';
import Breadcrumb from '../Breadcrumb';
import LeaveSpace from '../LeaveSpace';
import SidebarLine from '../SidebarLine';

function Members({ setMsg }) {
    const { spaceId } = useParams();
    const [members, setMembers] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);

    async function fetchMembers() {
        setMsg(Config.waitMsg);
        let response = await makeRequest('/spaces/' + spaceId + '/members', 'GET', null)
        if (response.ok) {
            let members = await response.json()
            setCurrentUserAdmin(members);
            setMembers(members);
            setMsg(Config.blankSymbol);
        } else {
            setMsg(await response.text());
        }
    };

    function setCurrentUserAdmin(members) {
        members.forEach((item) => {
            if (item.is_admin && item.user.login === sessionStorage.getItem("currentUser")) {
                setIsAdmin(true);
            }
        });
    }

    useEffect(() => {
        fetchMembers();
        // eslint-disable-next-line
    }, []);

    return (
        <div className='div-flex-basic'>
            <div className="sidebar">
                <br />
                <AddMember
                    setMsg={setMsg}
                    spaceId={spaceId}
                    fetchMembers={fetchMembers}
                    isAdmin={isAdmin} />
                <SidebarLine />
                <LeaveSpace
                    setMsg={setMsg}
                    spaceId={spaceId}
                    members={members}
                />
            </div>
            <div className="content-div">
                <div className='breadcrumb-div'>
                    <Breadcrumb to={'/'} display={'spaces'} />
                    <Breadcrumb to={'/spaces/' + spaceId} setMsg={setMsg} spaceId={spaceId} />
                    <Breadcrumb to={''} display={'members'} reload={fetchMembers} />
                </div>
                <div className='members-container'>
                    {members.map((item) => {
                        return <Member
                            member={item}
                            fetchMembers={fetchMembers}
                            spaceId={spaceId}
                            setMsg={setMsg}
                            isAdmin={isAdmin}
                            setIsAdmin={setIsAdmin}
                            key={item.user.id} />
                    })}
                </div>
            </div>
        </div >
    );
}

export default Members