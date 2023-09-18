import { useNavigate, useParams } from 'react-router-dom';

function Space() {
    const { id } = useParams();
    const navigate = useNavigate()
    

    return (
        <div>
            <button onClick={() => navigate(-1)}>Go back</button>
            <div>
                Space: {id}
            </div>
        </div>
    );
}

export default Space;