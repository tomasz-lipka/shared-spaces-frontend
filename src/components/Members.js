import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Member from "./Member"
import { makeRequest } from "../Helper"

function Members({ setMsg }) {

    const navigate = useNavigate()
    const { spaceId } = useParams();
    const [loading, setLoading] = useState(false);
    const [space, setSpace] = useState('');
    const [members, setMembers] = useState([]);
    const [userId, setUserId] = useState('');

    function startFunction() {
        setMsg('Please wait...');
        setLoading(true);
    }

    function endFunction() {
        setMsg('\u00A0');
        setLoading(false);
    }

    const fetchSpace = async () => {
        startFunction();
        let response = await makeRequest('/spaces/' + spaceId, 'GET', null)
        setSpace(await response.json());
        endFunction();
    };

    const fetchMembers = async () => {
        startFunction()
        let response = await makeRequest('/spaces/' + spaceId + '/members', 'GET', null)
        setMembers(await response.json());
        endFunction();
    };

    const addMember = async () => {
        startFunction()
        let requestBody = JSON.stringify({
            "user-id": userId
        });
        let response = await makeRequest('/spaces/' + spaceId + '/members', 'POST', requestBody)
        if (response.ok) {
            fetchMembers();
            setUserId('')
        } else {
            setMsg(await response.text());
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSpace();
        fetchMembers();
    }, []);

    return (
        <div >
            <div className="left-div">
                <br />
                <a href="#" onClick={(e) => { e.preventDefault(); navigate(-1); }}>{'<<'}Go back</a>
                <hr />
                <div>
                    <input
                        placeholder="Login of new member..."
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    />
                </div>
                <button onClick={addMember} disabled={loading}>Add member</button>
                <hr />
            </div>
            <div className="right-div">
                {loading ? '\u00A0' : <h3>{space.name} members</h3>}
                {members.map((value) => {
                    return <Member value={value} fetchMembers={fetchMembers} spaceId={spaceId} key={value.user.id} />
                })}
            </div>
        </div >
    );
}

export default Members