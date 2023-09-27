import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Config from '../../Config';
import { makeRequest } from "../../Helper"

function Images({ setMsg }) {
    const navigate = useNavigate()
    const [images, setImages] = useState([])
    const { spaceId } = useParams();
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
        <div className='div-flex-basic'>
            <div className="sidebar">
                <br />
                <a href="#/" onClick={(e) => { e.preventDefault(); navigate(-1); }}>{'<<'} Back</a>
            </div>
            <div className="content-div">
            <div className='content-title'>{Config.titleSymbol} spaces {Config.titleSymbol} {space.name} {Config.titleSymbol} photos</div>

                {
                    images.length === 0 ? (
                        <p>No images</p>
                    ) : (
                        <div className="image-container">
                            {images.map((item) => (
                                <img
                                    src={item.image_url}
                                    alt='Attached to the share'
                                    className="small-image"
                                    key={item.image_url}
                                />
                            ))}
                        </div>
                    )
                }
            </div>
        </div >
    );
}

export default Images;