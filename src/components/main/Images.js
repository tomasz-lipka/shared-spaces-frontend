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

    function renderNoImages() {
        return <p>No images</p>
    }

    function renderImages() {
        return (<div>
            {images.map((item) => (
                <img
                    src={item.image_url}
                    alt='Attached to the share'
                    className='images-page'
                    key={item.image_url}
                />
            ))}
        </div>);
    }


    useEffect(() => {
        fetchImages();
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            {images.length === 0 ? renderNoImages() : renderImages()}
        </div>
    );
}

export default Images;