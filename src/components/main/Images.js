import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Config from '../../Config';
import { makeRequest } from "../../Helper"
import Breadcrumb from './Breadcrumb';

function Images({ setMsg }) {
    const { spaceId } = useParams();
    const [images, setImages] = useState([])
    const [space, setSpace] = useState('');

    async function fetchSpace() {
        setMsg('Please wait...');
        let response = await makeRequest('/spaces/' + spaceId, 'GET', null)
        if (response.ok) {
            setSpace(await response.json());
            setMsg('\u00A0');
        } else {
            setMsg(await response.text());
        }
    };

    async function fetchImages() {
        setMsg(Config.waitMsg)
        let response = await makeRequest('/spaces/' + spaceId + '/images', 'GET', null)
        if (response.ok) {
            setImages(await response.json());
            setMsg(Config.blankMsg)
        } else {
            setMsg(await response.text())
        }
    }

    useEffect(() => {
        fetchSpace()
        fetchImages()
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <div className='breadcrumb-div'>
                <Breadcrumb to={'/'} display={'spaces'} />
                <Breadcrumb to={'/spaces/' + spaceId} display={space.name} />
                <Breadcrumb to={''} display={'all photos'} />
            </div>
            {images.length === 0 ? (
                <p>No photos</p>
            ) : (
                <div className="image-container">
                    {images.map((item) => (
                        <img
                            src={item.image_url}
                            alt='Attached to the share'
                            className="all-photos-image"
                            key={item.image_url}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Images;