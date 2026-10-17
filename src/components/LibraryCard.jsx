function LibraryCard({ library }) {

    return (
        <div
            className="library-card"
            data-name={library.name}
            data-location={library.location}
        >

            <div className="library-card-header">

                <div className="library-icon">
                    <i className="fa-solid fa-building-columns"></i>
                </div>

                <div>
                    <h3>{library.name}</h3>
                </div>

            </div>


            <p>
                <strong>Location:</strong> {library.location}
            </p>

            <p>
                <strong>Books:</strong> {library.books}
            </p>

            <p>
                <strong>Opening:</strong> {library.hours}
            </p>


            <button
                onClick={() =>
                    alert("Library details will be available soon.")
                }
            >
                View Library
            </button>

        </div>
    );
}

export default LibraryCard;