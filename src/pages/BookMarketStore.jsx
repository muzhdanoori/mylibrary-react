import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BookCard from "../components/BookCard";

function BookMarketStore() {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");

    const books = [
        {
            name: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            category: "Literature",
            status: "Available"
        },
        {
            name: "Atomic Habits",
            author: "James Clear",
            category: "Self Development",
            status: "Available"
        },
        {
            name: "Clean Code",
            author: "Robert C. Martin",
            category: "Technology",
            status: "Available"
        },
        {
            name: "The Alchemist",
            author: "Paulo Coelho",
            category: "Fiction",
            status: "Available"
        }
    ];

    const filteredBooks = books.filter((book) => {

        const searchText = search.toLowerCase().trim();

        const matchesSearch =
            book.name.toLowerCase().includes(searchText) ||
            book.author.toLowerCase().includes(searchText);

        const matchesCategory =
            category === "" ||
            book.category === category;

        return matchesSearch && matchesCategory;
    });

    function selectCategory(categoryName) {

        setCategory(categoryName);

        document
            .getElementById("bookGrid")
            ?.scrollIntoView({
                behavior: "smooth"
            });
    }

    return (

        <div className="library-layout">

            <Sidebar
                activePage="book-market-store"
                isOpen={sidebarOpen}
            />

            <main className="main-content">

                <Navbar
                    title="Book Market Store"
                    onSearchChange={setSearch}
                    searchValue={search}
                    onMenuClick={() =>
                        setSidebarOpen(!sidebarOpen)
                    }
                />

                <section className="hero-section">

                    <h1>Book Market Store</h1>

                    <p>
                        Find and shop your favorite books.
                    </p>

                    <div className="search-area">

                        <input
                            type="text"
                            id="bookSearch"
                            placeholder="Search by book name or author"
                            value={search}
                            onChange={(event) =>
                                setSearch(event.target.value)
                            }
                        />

                        <select
                            id="categoryFilter"
                            value={category}
                            onChange={(event) =>
                                setCategory(event.target.value)
                            }
                        >

                            <option value="">
                                All Categories
                            </option>

                            <option value="Literature">
                                Literature
                            </option>

                            <option value="Technology">
                                Technology
                            </option>

                            <option value="Fiction">
                                Fiction
                            </option>

                            <option value="Self Development">
                                Self Development
                            </option>

                        </select>

                        <button onClick={() => {}}>
                            Search
                        </button>

                    </div>

                </section>

                <section className="white-section">

                    <h2>Popular Categories</h2>

                    <p className="section-description">
                        Explore books from different categories.
                    </p>

                    <div className="service-grid">

                        <div className="service-card">
                            <i className="fa-solid fa-book"></i>
                            <div>
                                <h3>Literature</h3>
                                <p>Explore literature books.</p>
                            </div>
                        </div>

                        <div className="service-card">
                            <i className="fa-solid fa-laptop"></i>
                            <div>
                                <h3>Technology</h3>
                                <p>Explore technology books.</p>
                            </div>
                        </div>

                        <div className="service-card">
                            <i className="fa-solid fa-heart"></i>
                            <div>
                                <h3>Self Development</h3>
                                <p>Improve your skills and habits.</p>
                            </div>
                        </div>

                        <div className="service-card">
                            <i className="fa-solid fa-book-open"></i>
                            <div>
                                <h3>Fiction</h3>
                                <p>Discover amazing stories.</p>
                            </div>
                        </div>

                    </div>

                </section>

                <section
                    className="white-section"
                    id="bookGrid"
                >

                    <h2>Books For Sale</h2>

                    <p className="section-description">
                        Browse books available in our market store.
                    </p>

                    {filteredBooks.length > 0 ? (

                        <div className="book-grid">

                            {filteredBooks.map((book) => (

                                <BookCard
                                    key={book.name}
                                    book={book}
                                />

                            ))}

                        </div>

                    ) : (

                        <div
                            id="noBooks"
                            className="no-books"
                            style={{ display: "block" }}
                        >
                            No books found.
                        </div>

                    )}

                </section>

                <section className="white-section">

                    <h2>Shop By Category</h2>

                    <p className="section-description">
                        Select a category to find your favorite books.
                    </p>

                    <div className="category-grid">

                        {[
                            "Literature",
                            "Technology",
                            "Fiction",
                            "Self Development"
                        ].map((item) => (

                            <div
                                className="category-item"
                                key={item}
                                onClick={() =>
                                    selectCategory(item)
                                }
                            >

                                <span>{item}</span>

                                <i className="fa-solid fa-chevron-right"></i>

                            </div>

                        ))}

                    </div>

                </section>

                <Footer />

            </main>

        </div>
    );
}

export default BookMarketStore;