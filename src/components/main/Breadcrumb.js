import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { makeRequest } from '../../Helper'

function Breadcrumb() {
    const location = useLocation();
    const pathSegments = location.pathname.split('/').filter(segment => segment !== '');
    const [spaceName, setSpaceName] = useState('');

    async function fetchSpace(spaceId) {
        if (spaceId) {
            let response = await makeRequest('/spaces/' + spaceId, 'GET', null)
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
    }

    const breadcrumbs = pathSegments.map((segment, index) => {
        if (segment === 'settings') {
            return null;
        }
        if (index === 1) {
            fetchSpace(segment);
        };
        const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
        const label = index === 1 ? spaceName : segment;

        return (
            <span key={path}>
                <Link
                    className='breadcrumb'
                    to={path}
                    onClick={() => lastSegmentClicked(index)}
                >
                    {label}
                </Link>
                <span className='breadcrumb'> / </span>
            </span>
        );
    });

    return <div>{breadcrumbs}</div>;
};

export default Breadcrumb;