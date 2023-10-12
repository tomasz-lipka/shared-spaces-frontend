function CustomInput({ value, setValue, label, type }) {
    type ? type = 'text' : type = 'password'
    return (
        <div>
            <label>{label}:
                <br />
                <input
                    className='custom-input'
                    value={value}
                    type={type}
                    onChange={(e) => setValue(e.target.value)}
                    name='custom-input'
                /></label>
            <br />
        </div>
    );
}

export default CustomInput;