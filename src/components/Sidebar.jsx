import { Link } from "react-router-dom";

function Sidebar({ activePage, isOpen }) {
    return (
        <aside className={`sidebar ${isOpen ? "show" : ""}`} id="sidebar">

            <div className="logo-area">

                <div className="logo-box">
                    ML
                </div>

                <div className="logo-text">
                    <h2>MyLibrary</h2>
                    <span>Library Portal</span>
                </div>

            </div>


            <nav className="sidebar-menu">

                <Link
                    to="/dashboard"
                    className={`sidebar-link ${
                        activePage === "dashboard" ? "active" : ""
                    }`}
                >
                    <i className="fa-solid fa-house"></i>
                    <span>Dashboard</span>
                </Link>


                <Link
                    to="/find-book"
                    className={`sidebar-link ${
                        activePage === "find-book" ? "active" : ""
                    }`}
                >
                    <i className="fa-solid fa-book"></i>
                    <span>Find Book</span>
                </Link>


                <Link
                    to="/find-library"
                    className={`sidebar-link ${
                        activePage === "find-library" ? "active" : ""
                    }`}
                >
                    <i className="fa-solid fa-building"></i>
                    <span>Find Library</span>
                </Link>
                   <Link
    to="/book-market-store"
    className={`sidebar-link ${
        activePage === "book-market-store" ? "active" : ""
    }`}
>
    <i className="fa-solid fa-store"></i>
    <span>Book Market Store</span>
</Link>
<Link
    to="/find-study-center"
    className={`sidebar-link ${
        activePage === "find-study-center" ? "active" : ""
    }`}
>
    <i className="fa-solid fa-graduation-cap"></i>
    <span>Find Study Center</span>
</Link>

               

              <Link
             to="/reading-profile"
              className={`sidebar-link ${
              activePage === "reading-profile" ? "active" : ""
               }`}
             >
              <i className="fa-solid fa-user"></i>
              <span>My Reading Profile</span>
            </Link>

            <Link
    to="/settings"
    className={`sidebar-link ${
        activePage === "settings" ? "active" : ""
    }`}
>
    <i className="fa-solid fa-gear"></i>
    <span>Settings</span>
</Link>

            </nav>

        </aside>
    );
}

export default Sidebar;