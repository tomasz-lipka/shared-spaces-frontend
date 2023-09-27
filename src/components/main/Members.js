import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Member from "./Member"
import { makeRequest } from "../../Helper"
import Config from '../../Config';

function Members({ setMsg }) {
    const navigate = useNavigate()
    const { spaceId } = useParams();
    const [space, setSpace] = useState('');
    const [members, setMembers] = useState([]);
    const [userId, setUserId] = useState('');

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

    async function addMember() {
        setMsg(Config.waitMsg);
        let requestBody = JSON.stringify({
            "user-id": userId
        });
        let response = await makeRequest('/spaces/' + spaceId + '/members', 'POST', requestBody)
        if (response.ok) {
            fetchMembers();
            setUserId('')
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
                <a href="#/" onClick={(e) => { e.preventDefault(); navigate(-1); }} className='main-menu-item'>
                    {Config.backSymbol}
                </a>
                <br /><br /><hr /><br />
                <div>
                    <input
                        placeholder="Login of new member..."
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    />
                </div>
                <button onClick={addMember} >Add member</button>
            </div>
            <div className="content-div">
                <div className='content-title'>{Config.titleSymbol} spaces {Config.titleSymbol} {space.name} {Config.titleSymbol} members</div>
                {members.map((item) => {
                    return <Member member={item} fetchMembers={fetchMembers} spaceId={spaceId}
                        key={item.user.id} setMsg={setMsg} />
                })}
            </div>
        </div >
    );
}

export default Members