function ShareContent({ share }) {
    return (
        <div>
            <div className="share-content">
                {share.image_url && (
                    <img src={share.image_url} alt='Attached to the share' className='share-image' />
                )}
            </div>
            <div className="share-content">
                <p>{share.text}</p>
            </div>
        </div>
    );
}

export default ShareContent