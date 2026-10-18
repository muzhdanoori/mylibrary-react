
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BookCard from "../components/BookCard";

import physicsImage from "../assets/images/physics.webp";
import webImage from "../assets/images/web.jpg";
import mathImage from "../assets/images/mathematics.jpg";
import historyImage from "../assets/images/world-history.jpg";

function FindBook() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");

    const books = [
        {
            name: "Introduction to Physics",
            author: "John Smith",
            category: "Science",
            status: "Available",
            image: physicsImage
        },
        {
            name: "Web Development Basics",
            author: "Sarah Wilson",
            category: "Technology",
            status: "Available",
            image: webImage
        },
        {
            name: "Advanced Mathematics",
            author: "Michael Brown",
            category: "Mathematics",
            status: "Borrowed",
            image: mathImage
        },
        {
            name: "World History",
            author: "David Clark",
            category: "History",
            status: "Available",
            image: historyImage
        }
    ];

    const filteredBooks = books.filter((book) => {
        const searchText = search.toLowerCase().trim();

        const matchesSearch =
            book.name.toLowerCase().includes(searchText) ||
            book.author.toLowerCase().includes(searchText);

        const matchesCategory =
            category === "" || book.category === category;

        return matchesSearch && matchesCategory;
    });

    function selectCategory(categoryName) {
        setCategory(categoryName);

        document.getElementById("bookGrid")?.scrollIntoView({
            behavior: "smooth"
        });
    }

    return (
        <div className="library-layout">
            <Sidebar
                activePage="find-book"
                isOpen={sidebarOpen}
            />

            <main className="main-content">
                <Navbar
                    title="Find Book"
                    onMenuClick={() => setSidebarOpen(!sidebarOpen)}
                />

                <section className="hero-section">
                    <h1>Find a Book</h1>

                    <p>
                        Search for books by title, author or category.
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
                            <option value="">All Categories</option>
                            <option value="Science">Science</option>
                            <option value="Technology">Technology</option>
                            <option value="Mathematics">Mathematics</option>
                            <option value="Literature">Literature</option>
                            <option value="History">History</option>
                            <option value="Fiction">Fiction</option>
                        </select>

                        <button
                            type="button"
                            onClick={() =>
                                document
                                    .getElementById("bookGrid")
                                    ?.scrollIntoView({ behavior: "smooth" })
                            }
                        >
                            Search
                        </button>
                    </div>
                </section>

                {/* POPULAR CATEGORIES */}
                <section className="white-section">
                    <h2>Popular Categories</h2>

                    <p className="section-description">
                        Explore books from different categories.
                    </p>

                    <div className="service-grid">
                        <div
                            className="service-card"
                            onClick={() => selectCategory("Science")}
                        >
                            <i className="fa-solid fa-flask"></i>
                            <div>
                                <h3>Science</h3>
                                <p>Explore science books.</p>
                            </div>
                        </div>

                        <div
                            className="service-card"
                            onClick={() => selectCategory("Technology")}
                        >
                            <i className="fa-solid fa-laptop"></i>
                            <div>
                                <h3>Technology</h3>
                                <p>Explore technology books.</p>
                            </div>
                        </div>

                        <div
                            className="service-card"
                            onClick={() => selectCategory("Mathematics")}
                        >
                            <i className="fa-solid fa-calculator"></i>
                            <div>
                                <h3>Mathematics</h3>
                                <p>Explore mathematics books.</p>
                            </div>
                        </div>

                        <div
                            className="service-card"
                            onClick={() => selectCategory("Literature")}
                        >
                            <i className="fa-solid fa-book-open"></i>
                            <div>
                                <h3>Literature</h3>
                                <p>Explore literature books.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* BOOKS */}
                <section className="white-section" id="bookGrid">
                    <h2>Available Books</h2>

                    <p className="section-description">
                        Browse books available in MyLibrary.
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
                            className="no-books"
                            style={{ display: "block" }}
                        >
                            No books found.
                        </div>
                    )}
                </section>

                {/* FIND BY CATEGORY */}
                <section className="white-section">
                    <h2>Find Books By Category</h2>

                    <p className="section-description">
                        Select a category to filter books.
                    </p>

                    <div className="category-grid">
                        {[
                            "Science",
                            "Technology",
                            "Mathematics",
                            "Literature",
                            "History",
                            "Fiction"
                        ].map((item) => (
                            <div
                                className="category-item"
                                key={item}
                                onClick={() => selectCategory(item)}
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

export default FindBook;
