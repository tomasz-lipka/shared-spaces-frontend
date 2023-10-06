import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeRequest } from "../../../Helper"
import Config from '../../../Config';
import CreateSpace from './CreateSpace';
import Breadcrumb from '../Breadcrumb';

function Spaces({ setMsg }) {
    const navigate = useNavigate()
    const [spaces, setSpaces] = useState([]);

    async function fetchSpaces() {
        setMsg(Config.waitMsg)
        let response = await makeRequest('/spaces', 'GET', null)
        if (response.ok) {
            setSpaces(await response.json());
            setMsg(Config.blankSymbol);
        } else {
            setMsg(await response.text())
        }
    };

    useEffect(() => {
        fetchSpaces();
        // eslint-disable-next-line
    }, []);

    return (
        <div className='div-flex-basic'>
            <div className="sidebar">
                <br />
                <CreateSpace setMsg={setMsg} fetchSpaces={fetchSpaces} />
            </div>
            <div className="content-div">
                <div className='breadcrumb-div'>
                    <Breadcrumb to={''} display={'spaces'} reload={fetchSpaces}/>
                </div>
                {spaces.length === 0 ? (
                    <p>No spaces</p>
                ) : (
                    spaces.map((item) => (
                        <a href="#/"
                            onClick={(e) => { e.preventDefault(); navigate(`/spaces/${item.space.id}`); }}
                            className="space-link"
                            key={item.space.id}>
                            <div className="space"><p>{item.space.name}</p></div>
                        </a>
                    ))
                )}
            </div>
        </div>
    );
}

export default Spaces;