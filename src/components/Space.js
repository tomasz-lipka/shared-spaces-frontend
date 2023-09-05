function Space(props) {
    return (
        <div className="space">
            <h3>{props.user}, {props.date}</h3>
            <p>{props.text}</p>
        </div>  
    );
};

export default Space;