import { useNavigate } from 'react-router-dom';
import { makeRequest } from "../../../Helper"
import Config from '../../../Config';

function Member({ member, fetchMembers, spaceId, setMsg, isAdmin }) {
    const navigate = useNavigate()

    async function deleteMember(userId, login) {
        setMsg(Config.waitMsg);
        let response = await makeRequest('/spaces/' + spaceId + '/members/' + userId, 'DELETE', null)

        if (sessionStorage.getItem("currentUser") === login) {
            alert("You left the space")
            navigate(-2);
        }
        if (response.ok) {
            fetchMembers();

        } else {
            setMsg(await response.text());
        }
    };

    async function changeAdminPermission(userId) {
        setMsg(Config.waitMsg);
        let requestBody = JSON.stringify({
            "is-admin": !Boolean(member.is_admin)
        });
        let response = await makeRequest('/spaces/' + spaceId + '/members/' + userId, 'PUT', requestBody)

        if (response.ok) {
            fetchMembers();
        } else {
            setMsg(await response.text());
        }
    };

    return (
        <div className="member" key={member.user.id}>
            <h4>{member.user.login}</h4>
            <p>{member.is_admin ? 'Admin' : 'Member'}</p>
            <button onClick={() => changeAdminPermission(member.user.id)} disabled={!isAdmin}>
                {isAdmin ? 'Unmake admin' : 'Make admin'}
            </button>
            <button onClick={() => deleteMember(member.user.id, member.user.login)} disabled={!isAdmin}>
                Delete
            </button>
        </div>
    )
}

export default Member