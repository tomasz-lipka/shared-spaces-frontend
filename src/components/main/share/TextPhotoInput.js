import { useState, useEffect } from 'react';

function TextPhotoInput({ setFile, text, setText, execute, defaultFileName, buttonText }) {
    const [fileName, setFileName] = useState('');

    function handleFileChange(event) {
        setFile(event.target.files[0]);
        if (event.target.files[0]) {
            setFileName(event.target.files[0].name)
        }
    };

    useEffect(() => {
        setFileName(defaultFileName);
    }, [defaultFileName]);

    return (
        <div>
            <div>
                <textarea
                    className='text-align-left'
                    type="text"
                    placeholder="What do you want to share with your space?"
                    rows="5"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <input
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    onChange={handleFileChange}
                    id="fileInput"
                />
                <label for="fileInput" class="file-upload">
                    Choose a photo 📷
                </label>
                <span className='chosen-image'> {fileName}</span>
            </div>
            <button onClick={execute} >{buttonText}</button>
        </div>
    );
}

export default TextPhotoInput