import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeRequest } from '../../../Helper'
import Config from '../../../Config';

function Breadcrumb({ segment, index, pathSegments }) {
    const [spaceName, setSpaceName] = useState('...');

    async function fetchSpace(spaceId) {
        if (spaceId && !isNaN(spaceId)) {
            let response = await makeRequest('/spaces/' + spaceId, 'GET', null, 'Breadcrumb')
            if (response.ok) {
                let data = await response.json();
                setSpaceName(data.name);
            }
        }
    };

    function lastSegmentClicked(index) {
        const isLastSegment = index === pathSegments.length - 1;
        if (isLastSegment) {
            window.location.reload();
        }
    };

    function renderBreadcrumb() {
        if (segment === Config.settingsPath) {
            return Config.blankSymbol;
        }
        if (index === 1) {
            fetchSpace(segment);
        };
        const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
        const label = index === 1 ? spaceName : segment;

        return (
            <div>
                <Link
                    className='breadcrumb'
                    to={path}
                    onClick={() => lastSegmentClicked(index)}
                >
                    {label}
                </Link>
                <span className='breadcrumb'> /{Config.blankSymbol}</span>
            </div>
        );
    }

    return (renderBreadcrumb())
}

export default Breadcrumb;