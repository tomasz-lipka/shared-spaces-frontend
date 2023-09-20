import { format } from "date-fns";
import config from '../config';


function Share({ value, fetchShares }) {

    const formattedTimestamp = format(new Date(value.timestamp), "dd/MM/yyyy HH:mm");
    const showButton = sessionStorage.getItem("currentUser") === value.user.login;


    const deleteShare = async (shareId) => {
        // setDeleteLoading(true)
        const response = await fetch(config.apiUrl + '/shares/' + shareId, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${sessionStorage.getItem("access_token")}`
            },
        });
        if (response.ok) {
            await response;
            fetchShares();
        }
    };

    return (
        <div className="share" key={value.id}>
            <div className="left-div-flex">
                <p><b>{value.user.login}</b></p>
                <p>{formattedTimestamp}</p>
            </div>
            <div className="right-div-flex">
                {showButton && (
                    <button
                        onClick={() => deleteShare(value.id)}>Delete</button>
                )}
                <p>{value.text}</p>
            </div>
        </div>
    );
}

export default Share;