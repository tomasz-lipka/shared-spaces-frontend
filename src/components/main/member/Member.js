import { makeRequest } from "../../../Helper"
import Config from '../../../Config';

function Member({ member, fetchMembers, spaceId, setMsg, isAdmin, setIsAdmin }) {

    async function deleteMember(userId) {
        setMsg(Config.waitMsg);
        let response = await makeRequest('/spaces/' + spaceId + '/members/' + userId, 'DELETE', null)
        response.ok ? fetchMembers() : setMsg(await response.text());
    };

    async function changeAdminPermission(userId) {
        setMsg(Config.waitMsg);
        let requestBody = JSON.stringify({
            "is-admin": !Boolean(member.is_admin)
        });
        let response = await makeRequest('/spaces/' + spaceId + '/members/' + userId, 'PUT', requestBody)
        response.ok ? fetchMembers() : setMsg(await response.text());
        setIsAdmin(!Boolean(member.is_admin))
    };

    return (
        <div className="member" key={member.user.id}>
            <h4>{member.user.login}</h4>
            <p>{member.is_admin ? 'admin' : Config.blankSymbol}</p>
            <div>
                <button onClick={() => changeAdminPermission(member.user.id)} disabled={!isAdmin}>
                    {member.is_admin ? 'Unmake admin' : 'Make admin'}
                </button>
            </div>
            <div>
                <button onClick={() => deleteMember(member.user.id)} disabled={!isAdmin}>
                    Delete
                </button>
            </div>
        </div>
    )
}

export default Member