import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Config from '../../Config';
import { makeRequest } from '../../Helper';

function Images({ setMsg }) {
    const { spaceId } = useParams();
    const [images, setImages] = useState([]);

    async function fetchImages() {
        setMsg(Config.waitMsg);
        let response = await makeRequest('/spaces/' + spaceId + '/images', 'GET', null);
        if (response.ok) {
            setImages(await response.json());
            setMsg(Config.blankSymbol);
        } else {
            setMsg(await response.text());
        }
    };

    useEffect(() => {
        fetchImages();
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            {images.length === 0 ? (
                <p>No images</p>
            ) : (
                <div>
                    {images.map((item) => (
                        <img
                            src={item.image_url}
                            alt='Attached to the share'
                            className='all-photos-image'
                            key={item.image_url}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Images;