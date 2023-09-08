import React, { useState } from 'react';
import config from '../config';

function Spaces({ props }) {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    const createSpace = async () => {
        setLoading(true);
        const response = await fetch(config.apiUrl + '/spaces', {
            method: 'POST',
            body: `{
            "name": "${name}"
          }`,
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${sessionStorage.getItem("access_token")}`
            },
        });
        if (response.ok) {
            const msg = await response.text();
            alert(msg);
            setLoading(false);
        } else {
            const errorMessage = await response.text();
            setErrMsg(errorMessage);
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="left-div">
                <div>
                    <h3>New space</h3>
                    <label>Name: </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <button onClick={createSpace}>
                    {loading ? 'Creating...' : 'Create space'}
                </button>
                <p>{errMsg}</p>
            </div>
            <div className="right-div">
                <h3>My spaces</h3>
                {props.map((value) => {
                    return (
                        <div className="space" key={value.space.id}>
                            <p>{value.space.name}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
export default Spaces;