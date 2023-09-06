function Spaces({ props }) {

    return (
        <div>
            <h3>My spaces</h3>
            {props.map((value) => {
                return (
                    <div className="space">
                        <p>{value.space.name}</p>
                    </div>
                );
            })}
        </div>
    );
}
export default Spaces;