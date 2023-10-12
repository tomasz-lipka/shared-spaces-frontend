import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeRequest } from '../../../Helper'
import Config from '../../../Config';
import CreateSpace from './CreateSpace';

function Spaces({ setMsg }) {
    const navigate = useNavigate();
    const [spaces, setSpaces] = useState([]);

    async function fetchSpaces() {
        setMsg(Config.waitMsg)
        let response = await makeRequest('/spaces', 'GET', null);
        if (response.ok) {
            setSpaces(await response.json());
            setMsg(Config.blankSymbol);
        }
    };

    function renderNoSpaces() {
        return <p>No spaces</p>
    };

    function renderSpaces() {
        return spaces.map((item) => (
            <a href='#/'
                onClick={(e) => { e.preventDefault(); navigate(`/spaces/${item.space.id}`); }}
                key={item.space.id}>
                <div className='space-tile'>
                    {item.space.name}
                </div>
            </a>
        ));
    };

    function renderContent() {
        return spaces.length === 0 ? renderNoSpaces() : renderSpaces();
    };

    useEffect(() => {
        fetchSpaces();
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <aside>
                <CreateSpace setMsg={setMsg} fetchSpaces={fetchSpaces} />
            </aside>
            <div className='content-container'>
                {renderContent()}
            </div>
        </div>
    );
}

export default Spaces;