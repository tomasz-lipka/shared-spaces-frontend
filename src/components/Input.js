function Input({ value, setValue, label }) {
    return (
        <div>
            <label>{label}:</label>
            <br />
            <input
                className='auth-input'
                value={value}
                type="password"
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    );
}

export default Input