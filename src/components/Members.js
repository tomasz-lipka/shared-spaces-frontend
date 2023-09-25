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

    function endFunctionOk() {
        setMsg('\u00A0');
        setLoading(false);
    }

    const endFunctionErr = async (response) => {
        setMsg(await response.text());
        setLoading(false);
    }

    const fetchSpace = async () => {
        startFunction();
        let response = await makeRequest('/spaces/' + spaceId, 'GET', null)
        if (response.ok) {
            setSpace(await response.json());
            endFunctionOk();
        }else {
            endFunctionErr(response)
        }
    };

    const fetchMembers = async () => {
        startFunction()
        let response = await makeRequest('/spaces/' + spaceId + '/members', 'GET', null)
        if (response.ok) {
            setMembers(await response.json());
            endFunctionOk();
        } else {
            endFunctionErr(response)
        }
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
                <a href="#" onClick={(e) => { e.preventDefault(); navigate(-1); }}>{'<<'} Back</a>
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
                <h3>{space.name} members</h3>
                {members.map((item) => {
                    return <Member member={item} fetchMembers={fetchMembers} spaceId={spaceId}
                        key={item.user.id} setMsg={setMsg} loading={loading} setLoading={setLoading} />
                })}
            </div>
        </div >
    );
}

export default Members