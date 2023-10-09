import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import Config from '../../Config';
import { makeRequest } from "../../Helper"


function Breadcrumb({ to, display, reload, setMsg, spaceId }) {
    const [spaceName, setSpaceName] = useState('...');

    const handleClick = () => {
        if (to === '') {
            reload();
        }
    };

    async function fetchSpace() {
        if (spaceId) {
            setMsg(Config.waitMsg);
            let response = await makeRequest('/spaces/' + spaceId, 'GET', null)
            if (response.ok) {
                let data = await response.json();
                setSpaceName(data.name);
                setMsg(Config.blankSymbol);
            } else {
                setMsg(await response.text());
            }
        }
    };

    useEffect(() => {
        fetchSpace()
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <Link to={to} className='breadcrumb' onClick={handleClick}>
                {Config.titleSymbol}
                {Config.blankSymbol}
                {spaceId ? spaceName : display}
                {Config.blankSymbol}
            </Link>
        </div>
    );
}

export default Breadcrumb