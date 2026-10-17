import { useState } from "react";
import {Link} from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Dashboard() {

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [search, setSearch] = useState("");

    const recentBooks = [
        {
            name: "The Great Gatsby",
            author: "F. Scott Fitzgerald"
        },
        {
            name: "Pride and Prejudice",
            author: "Jane Austen"
        },
        {
            name: "Clean Code",
            author: "Robert C. Martin"
        }
    ];

    const filteredBooks = recentBooks.filter((book) =>
        book.name.toLowerCase().includes(search.toLowerCase().trim())
    );


    function showDetails() {
        alert(
            "More details will be available in the full library system."
        );
    }


    function showSectionMessage() {
        alert(
            "This section is not included in the exam project."
        );
    }


    return (

        <div className="dashboard-layout">

            <Sidebar
                activePage="dashboard"
                isOpen={sidebarOpen}
            />


            <main className="main-content">

                <Navbar
                    title="Dashboard"
                    searchValue={search}
                    onSearchChange={setSearch}
                    onMenuClick={() =>
                        setSidebarOpen(!sidebarOpen)
                    }
                />


                <section className="dashboard-body">

                    <div className="dashboard-heading">

                        <h1>Welcome To MyLibrary!</h1>

                        <p>
                            Manage your library activities easily
                            from your dashboard.
                        </p>

                    </div>


                    <div className="cards-container">


                        {/* CARD 1 */}

                        <div className="dashboard-card">

                            <div className="card-header">

                                <div>
                                    <h3>Total Books</h3>
                                    <p>Library collection</p>
                                </div>

                                <i className="fa-solid fa-circle-info info-icon"></i>

                            </div>


                            <div className="card-content">

                                <div className="circle-chart purple">
                                    <span className="chart-number">
                                        2450
                                    </span>
                                </div>


                                <div className="card-details">

                                    <div className="detail-row">
                                        <span>Available</span>
                                        <strong>1820</strong>
                                    </div>

                                    <div className="detail-row">
                                        <span>Borrowed</span>
                                        <strong>630</strong>
                                    </div>

                                    <button
                                        className="details-button"
                                        onClick={showDetails}
                                    >
                                        More Details
                                    </button>

                                </div>

                            </div>

                        </div>


                        {/* CARD 2 */}

                        <div className="dashboard-card">

                            <div className="card-header">

                                <div>
                                    <h3>Available Books</h3>
                                    <p>Current availability</p>
                                </div>

                                <i className="fa-solid fa-circle-info info-icon"></i>

                            </div>


                            <div className="card-content">

                                <div className="circle-chart blue">
                                    <span className="chart-number">
                                        74%
                                    </span>
                                </div>


                                <div className="card-details">

                                    <div className="detail-row">
                                        <span>Science</span>
                                        <strong>410</strong>
                                    </div>

                                    <div className="detail-row">
                                        <span>Technology</span>
                                        <strong>350</strong>
                                    </div>

                                    <div className="detail-row">
                                        <span>Fiction</span>
                                        <strong>620</strong>
                                    </div>

                                    <button
                                        className="details-button"
                                        onClick={showDetails}
                                    >
                                        More Details
                                    </button>

                                </div>

                            </div>

                        </div>


                        {/* CARD 3 */}

                        <div className="dashboard-card">

                            <div className="card-header">

                                <div>
                                    <h3>Borrowed Books</h3>
                                    <p>Weekly activity</p>
                                </div>

                                <i className="fa-solid fa-circle-info info-icon"></i>

                            </div>


                            <div className="borrowed-content">

                                <div className="bar-chart">

                                    <div className="bar-column">
                                        <div className="bar bar-1"></div>
                                        <span>Mon</span>
                                    </div>

                                    <div className="bar-column">
                                        <div className="bar bar-2"></div>
                                        <span>Tue</span>
                                    </div>

                                    <div className="bar-column">
                                        <div className="bar bar-3"></div>
                                        <span>Wed</span>
                                    </div>

                                    <div className="bar-column">
                                        <div className="bar bar-4"></div>
                                        <span>Thu</span>
                                    </div>

                                    <div className="bar-column">
                                        <div className="bar bar-5"></div>
                                        <span>Fri</span>
                                    </div>

                                    <div className="bar-column">
                                        <div className="bar bar-6"></div>
                                        <span>Sat</span>
                                    </div>

                                </div>


                                <div className="borrowed-bottom">

                                    <div>
                                        <strong>630</strong>
                                        <span>Total Borrowed</span>
                                    </div>

                                    <button
                                        className="details-button"
                                        onClick={showDetails}
                                    >
                                        More Details
                                    </button>

                                </div>

                            </div>

                        </div>


                        {/* CARD 4 */}

                        <div className="dashboard-card">

                            <div className="card-header">

                                <div>
                                    <h3>Total Members</h3>
                                    <p>Registered members</p>
                                </div>

                                <i className="fa-solid fa-circle-info info-icon"></i>

                            </div>


                            <div className="members-content">

                                <div className="member-icon">
                                    <i className="fa-solid fa-users"></i>
                                </div>

                                <div className="member-number">
                                    1,240
                                </div>

                                <div className="member-text">
                                    Total registered members
                                </div>

                                <div className="member-growth">
                                    8.4% this month
                                </div>

                                <button
                                    className="details-button"
                                    onClick={showSectionMessage}
                                >
                                    View Members
                                </button>

                            </div>

                        </div>
                             {/* CARD 5 - BOOK MARKET STORE */}

<Link
    to="/book-market-store"
    className="dashboard-card book-market-card"
>

    <div className="card-header">

        <div>
            <h3>Book Market Store</h3>
            <p>Explore and shop books</p>
        </div>

        <i className="fa-solid fa-store info-icon"></i>

    </div>


    <div className="members-content">

        <div className="member-icon">
            <i className="fa-solid fa-book-open"></i>
        </div>

        <div className="member-number">
            Book Store
        </div>

        <div className="member-text">
            Find your favorite books
        </div>

        <div className="member-growth">
            Browse • Search • Shop
        </div>

        <span className="details-button">
            Visit Store
        </span>

    </div>

</Link>

                    </div>

                      

                    {/* RECENT BOOKS */}

                    <div className="content-panel recent-panel">

                        <div className="panel-title">

                            <div>
                                <h2>Recent Books</h2>
                                <p>Recently added books</p>
                            </div>

                        </div>


                        <div className="recent-books">

                            {filteredBooks.map((book) => (

                                <div
                                    className="recent-book"
                                    key={book.name}
                                >

                                    <div className="recent-icon">
                                        <i className="fa-solid fa-book"></i>
                                    </div>

                                    <div>
                                        <h4>{book.name}</h4>
                                        <p>{book.author}</p>
                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>

                </section>


                <Footer />

            </main>

        </div>
    );
}

export default Dashboard;