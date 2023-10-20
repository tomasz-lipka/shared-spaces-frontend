import React from 'react';
import { useNavigate } from 'react-router-dom';

function SpaceSidebarNav({ spaceId }) {
    const navigate = useNavigate();

    return (
        <nav className='sidebar-box'>
            <a href='#/' onClick={(e) => { e.preventDefault(); navigate(`/spaces/${spaceId}/members`); }} className='sidebar-link'>
                Members
            </a>
            <br /><br />
            <a href='#/' onClick={(e) => { e.preventDefault(); navigate(`/spaces/${spaceId}/images`); }} className='sidebar-link'>
                All images
            </a>
            <br /><br />
            <a href='#/' onClick={(e) => { e.preventDefault(); navigate(`/spaces/${spaceId}/config`); }} className='sidebar-link'>
                Configure
            </a>
        </nav>
    );
}

export default SpaceSidebarNav;