import { useNavigate } from 'react-router-dom';

function Space() {
    const navigate = useNavigate()


    return (
        <div>
            <button onClick={() => navigate(-1)}>Go back</button>
            <div>
                Space:
            </div>
        </div>
    );
}

export default Space;