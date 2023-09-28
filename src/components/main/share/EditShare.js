import React, { useState } from 'react';



function EditShare({ originalText, setFile, setUpdatedText }) {

    const [fileName, setFileName] = useState(null);

    function handleFileChange(event) {
        setFile(event.target.files[0]);
        if (event.target.files[0]) {
            setFileName(event.target.files[0].name)
        }
    };

    return (
        <div>
            <div className='div-flex-basic'>
                <div className='div-flex'>
                    <textarea
                        type="text"
                        rows="5"
                        value={originalText}
                        onChange={(e) => setUpdatedText(e.target.value)}
                    />
                </div>
                {/* <div className='div-flex'>
                    <input
                        type="file"
                        accept=".jpg, .jpeg, .png"
                        onChange={handleFileChange}
                        id="fileInput"
                    />
                    <label for="fileInput" class="file-upload">
                        Choose a new photo 📷
                    </label>
                    <span className='chosen-image'> {fileName}</span>
                </div> */}
            </div>
        </div>
    );
}

export default EditShare