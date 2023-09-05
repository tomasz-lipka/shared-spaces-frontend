function EditPwd() {

    function handleClick() {
        // TODO response from API here
        alert("Password changed");
    }

    return (
        <div>
            <button onClick={handleClick}>Change password</button>
        </div>
    );
}

export default EditPwd;