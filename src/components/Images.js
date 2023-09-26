import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Config from '../Config';
import { makeRequest } from "../Helper"



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
        <div >
            <div className="left-div">
                <br />
                <a href="#/" onClick={(e) => { e.preventDefault(); navigate(-1); }}>{'<<'} Back</a>
                <hr />
            </div>
            <div className="right-div">
                <h3>{space.name} images</h3>

                {
                    images.length === 0 ? (
                        <p>No images</p>
                    ) : (
                        <div className="image-container">
                        {images.map((item, index) => (
                          <img
                            key={index}
                            src={item.image_url}
                            alt='Images attached to the share'
                            className="small-image"
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