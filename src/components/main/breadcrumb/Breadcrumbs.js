import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Breadcrumb from './Breadcrumb';

function Breadcrumbs() {
    const location = useLocation();
    const pathSegments = location.pathname.split('/').filter(segment => segment !== '');
    const [Breadcrumbs, setBreadcrumbs] = useState('');

    function mapBreadcrumbs() {
        let breadcrumbs = []
        pathSegments.forEach((segment, index) => {
            breadcrumbs.push(<Breadcrumb segment={segment} index={index} pathSegments={pathSegments} key={index} />)
        })
        setBreadcrumbs(breadcrumbs);
    }

    useEffect(() => {
        mapBreadcrumbs();
        // eslint-disable-next-line
    }, [location]);

    return (
        <div className='main-menu-bar'>
            {Breadcrumbs}
        </div>
    );
}

export default Breadcrumbs;