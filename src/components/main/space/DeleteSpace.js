import { useNavigate } from 'react-router-dom';
import { makeRequest } from '../../../Helper';
import Config from '../../../Config';

function DeleteSpace({ setMsg, spaceId, isAdmin }) {
    const navigate = useNavigate();

    async function deleteSpace() {
        const confirmed = window.confirm('Are you sure you want to delete this space?');
        if (confirmed) {
            setMsg(Config.waitMsg);
            let response = await makeRequest('/spaces/' + spaceId, 'DELETE', null);
            response.ok ? navigate('/spaces') : setMsg(await response.text());
        }
    };

    return (
        <button onClick={deleteSpace} disabled={!isAdmin} >Delete space</button>
    );
}

export default DeleteSpace;