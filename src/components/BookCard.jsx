
function BookCard({ book }) {
    return (
        <div
            className="book-card"
            data-name={book.name}
            data-author={book.author}
            data-category={book.category}
        >
            <div className={`book-cover ${book.category.toLowerCase()}`}>
                {book.image ? (
                    <img
                        src={book.image}
                        alt={`Cover of ${book.name}`}
                        className="book-cover-image"
                    />
                ) : (
                    <i className="fa-solid fa-book"></i>
                )}
            </div>

            <div className="book-info">
                <h3>{book.name}</h3>

                <p>
                    <strong>Author:</strong> {book.author}
                </p>

                <p>
                    <strong>Category:</strong> {book.category}
                </p>

                <span
                    className={
                        book.status === "Available"
                            ? "available"
                            : "borrowed"
                    }
                >
                    {book.status}
                </span>

                <button
                    className="details-button"
                    onClick={() =>
                        alert("Book details will be available soon.")
                    }
                >
                    View Details
                </button>
            </div>
        </div>
    );
}

export default BookCard;
