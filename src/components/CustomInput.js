import React from 'react';

function CustomInput({ value, setValue, label, type }) {
    type ? type = 'text' : type = 'password'
    return (
        <div>
            <input
                className='custom-input'
                value={value}
                type={type}
                onChange={(e) => setValue(e.target.value)}
                name='custom-input'
                placeholder={label}
            />
        </div>
    );
}

export default CustomInput;