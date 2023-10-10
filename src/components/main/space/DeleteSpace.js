import { useNavigate } from 'react-router-dom';
import { makeRequest } from '../../../Helper';
import Config from '../../../Config';

function DeleteSpace({ setMsg, spaceId, isAdmin }) {
    const navigate = useNavigate();

    async function deleteSpace() {
        setMsg(Config.waitMsg);
        let response = await makeRequest('/spaces/' + spaceId, 'DELETE', null);
        response.ok ? navigate('/') : setMsg(await response.text());
    };

    return (
        <div>
            <button onClick={deleteSpace} disabled={!isAdmin} >Delete space</button>
        </div>
    );
}

export default DeleteSpace;