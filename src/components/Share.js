import { format } from "date-fns";
import Config from '../Config';


function Share({ share, fetchShares, loading }) {

    const formattedTimestamp = format(new Date(share.timestamp), "dd/MM/yyyy HH:mm");
    const showButton = sessionStorage.getItem("currentUser") === share.user.login;


    const deleteShare = async (shareId) => {
        const response = await fetch(Config.apiUrl + '/shares/' + shareId, {
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
        <div className="share" key={share.id}>
            <div className="left-div-flex">
                <p><b>{share.user.login}</b></p>
                <p>{formattedTimestamp}</p>
            </div>
            <div className="right-div-flex">
                {showButton && (
                    <button
                        onClick={() => deleteShare(share.id)} disabled={loading}>Delete</button>
                )}
                <p>{share.text}</p>
            </div>
        </div>
    );
}

export default Share;