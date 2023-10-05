import { useNavigate } from 'react-router-dom';
import { makeRequest } from "../../Helper"
import Config from '../../Config';

function LeaveSpace({ setMsg, spaceId, members }) {
    const navigate = useNavigate()
    let userId;

    function setCurrentUserId() {
        members.map((item) => {
            if (item.user.login === sessionStorage.getItem("currentUser")) {
                userId = item.user.id
            }
        });
    }

    async function leaveSpace() {
        setCurrentUserId();
        setMsg(Config.waitMsg);
        let response = await makeRequest('/spaces/' + spaceId + '/members/' + userId, 'DELETE', null)
        if (response.ok) {
            navigate(-2);
        };
        setMsg(await response.text());
    }
    return (
        <div>
            <button onClick={leaveSpace} >Leave space</button>
        </div>
    );
}

export default LeaveSpace