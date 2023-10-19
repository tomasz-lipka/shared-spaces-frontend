import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Member from './Member';
import { makeRequest } from '../../../Helper';
import Config from '../../../Config';
import AddMember from './AddMember';
import LeaveSpace from '../LeaveSpace';

function Members({ setMsg }) {
    const { spaceId } = useParams();
    const [members, setMembers] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);

    async function fetchMembers() {
        setMsg(Config.waitMsg);
        let response = await makeRequest('/spaces/' + spaceId + '/members', 'GET', null);
        if (response.ok) {
            let members = await response.json();
            setCurrentUserAdmin(members);
            setMembers(members);
            setMsg(Config.blankSymbol);
        } else {
            setMsg(await response.text());
        }
    };

    function setCurrentUserAdmin(members) {
        members.forEach((item) => {
            if (item.is_admin && item.user.login === sessionStorage.getItem('currentUser')) {
                setIsAdmin(true);
            }
        });
    };

    useEffect(() => {
        fetchMembers();
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <aside>
                <AddMember
                    setMsg={setMsg}
                    spaceId={spaceId}
                    fetchMembers={fetchMembers}
                    isAdmin={isAdmin} />
                <LeaveSpace
                    setMsg={setMsg}
                    spaceId={spaceId}
                    members={members}
                />
            </aside>
            <div className='content-container'>
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

export default Members;