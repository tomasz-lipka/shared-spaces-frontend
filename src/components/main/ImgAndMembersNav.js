import { useNavigate } from 'react-router-dom';

function ImgAndMembersNav({ spaceId }) {
    const navigate = useNavigate()

    return (
        <div>
            <a href="#/" onClick={(e) => { e.preventDefault(); navigate(`/spaces/${spaceId}/members`); }} className='main-menu-item'>
                Members
            </a>
            <br />
            <br />
            <a href="#/" onClick={(e) => { e.preventDefault(); navigate(`/spaces/${spaceId}/images`); }} className='main-menu-item'>
                All photos
            </a>
        </div>
    );
}

export default ImgAndMembersNav