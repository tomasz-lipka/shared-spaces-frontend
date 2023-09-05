function Spaces(props) {
    return (
        <div>
            <h2>Your spaces</h2>
            {props.spaces.map(s => <div className="space"><h3>{s.spaceName}</h3></div>)}
        </div>
    );
};

export default Spaces;