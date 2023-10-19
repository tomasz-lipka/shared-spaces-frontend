import React from 'react';
import { useNavigate } from 'react-router-dom';

function ImgAndMembersNav({ spaceId }) {
    const navigate = useNavigate();

    return (
        <nav>
            <a href='#/' onClick={(e) => { e.preventDefault(); navigate(`/spaces/${spaceId}/members`); }} className='sidebar-link'>
                Members
            </a>
            <br /><br />
            <a href='#/' onClick={(e) => { e.preventDefault(); navigate(`/spaces/${spaceId}/images`); }} className='sidebar-link'>
                All images
            </a>
            <br /><br />
        </nav>
    );
}

export default ImgAndMembersNav;