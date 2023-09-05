function Spaces(props) {
    return (
        <div>
            {props.spaces.map(s => <div className="space"><h3>{s.spaceName}</h3></div>)}
        </div>
    );
};

export default Spaces;