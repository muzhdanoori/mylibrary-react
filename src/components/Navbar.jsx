import { useNavigate } from "react-router-dom";

function Navbar({ title, searchValue, onSearchChange, onMenuClick }) {

    const navigate = useNavigate();

    function handleLogout() {
        navigate("/");
    }

    function handleSettings() {
    navigate("/settings");
}

    function handleNotification() {
        alert("You have no new notifications.");
    }

    return (
        <header className="top-navbar">

            <div className="navbar-left">

                <button
                    className="menu-button"
                    onClick={onMenuClick}
                >
                    <i className="fa-solid fa-bars"></i>
                </button>

                <div>
                    <div className="breadcrumb">
                        <span>MyLibrary</span>
                        <span>/</span>
                        <span>{title}</span>
                    </div>

                    <h3>{title}</h3>
                </div>

            </div>


            <div className="navbar-right">

                <div className="navbar-search">

                    <i className="fa-solid fa-magnifying-glass"></i>

                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchValue || ""}
                        onChange={(event) =>
                            onSearchChange &&
                            onSearchChange(event.target.value)
                        }
                    />

                </div>


                <button
                    className="logout-button"
                    onClick={handleLogout}
                >
                    <i className="fa-solid fa-right-from-bracket"></i>
                    Logout
                </button>


                <button
                    className="navbar-icon"
                    onClick={handleSettings}
                >
                    <i className="fa-solid fa-gear"></i>
                </button>


                <button
                    className="navbar-icon"
                    onClick={handleNotification}
                >
                    <i className="fa-solid fa-bell"></i>
                </button>

            </div>

        </header>
    );
}

export default Navbar;