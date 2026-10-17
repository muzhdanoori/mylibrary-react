import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LibraryCard from "../components/LibraryCard";

function FindLibrary() {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [search, setSearch] = useState("");
    const [location, setLocation] = useState("");

    const libraries = [
        {
            name: "Central Public Library",
            location: "Kabul - Central Kabul",
            books: "15,000+ Books",
            hours: "8:00 AM - 5:00 PM"
        },
        {
            name: "University Library",
            location: "Kabul - Kabul University Area",
            books: "25,000+ Books",
            hours: "8:00 AM - 6:00 PM"
        },
        {
            name: "Community Library",
            location: "Herat - Herat City",
            books: "8,000+ Books",
            hours: "9:00 AM - 4:00 PM"
        },
        {
            name: "Digital Library",
            location: "Mazar-e-Sharif",
            books: "12,000+ Digital Books",
            hours: "24/7 Online Access"
        }
    ];


    const filteredLibraries = libraries.filter((library) => {

        const searchText = search.toLowerCase().trim();
        const locationText = location.toLowerCase().trim();

        const matchesName =
            library.name.toLowerCase().includes(searchText);

        const matchesLocation =
            library.location.toLowerCase().includes(locationText);

        return matchesName && matchesLocation;
    });


    return (

        <div className="library-layout">

            <Sidebar
                activePage="find-library"
                isOpen={sidebarOpen}
            />


            <main className="main-content">

                <Navbar
                    title="Find Library"
                    onMenuClick={() =>
                        setSidebarOpen(!sidebarOpen)
                    }
                />


                {/* HERO */}

                <section className="hero-section">

                    <h1>Find a Library</h1>

                    <p>
                        Find libraries by name and location.
                    </p>


                    <div className="search-area">

                        <input
                            type="text"
                            placeholder="Search library name"
                            value={search}
                            onChange={(event) =>
                                setSearch(event.target.value)
                            }
                        />


                        <input
                            type="text"
                            placeholder="City or location"
                            value={location}
                            onChange={(event) =>
                                setLocation(event.target.value)
                            }
                        />


                        <button onClick={() => {}}>
                            Search
                        </button>

                    </div>

                </section>


                {/* MAP */}

                <div className="library-content">

                    <div className="filter-box">

                        <h3>Filter Libraries</h3>


                        <label>
                            Library Type
                        </label>

                        <select>

                            <option>
                                All Libraries
                            </option>

                            <option>
                                Public Library
                            </option>

                            <option>
                                University Library
                            </option>

                            <option>
                                School Library
                            </option>

                        </select>


                        <label>
                            Location
                        </label>

                        <input
                            type="text"
                            placeholder="Enter location"
                        />


                        <label>
                            <input type="checkbox" />
                            Internet Access
                        </label>


                        <label>
                            <input type="checkbox" />
                            Study Rooms
                        </label>


                        <label>
                            <input type="checkbox" />
                            Computer Access
                        </label>


                        <button
                            onClick={() =>
                                alert("Filters applied.")
                            }
                        >
                            APPLY FILTER
                        </button>

                    </div>


                    <div className="map-area">

                        <div className="map-content">

                            <i className="fa-solid fa-location-dot"></i>

                            <h3>Libraries Near You</h3>

                            <p>
                                Library locations will appear here.
                            </p>

                        </div>

                    </div>

                </div>


                {/* LIBRARIES */}

                <section className="white-section">

                    <h2>Libraries</h2>

                    <p className="section-description">
                        Browse available libraries.
                    </p>


                    <div className="library-search-result">

                        {filteredLibraries.map((library) => (

                            <LibraryCard
                                key={library.name}
                                library={library}
                            />

                        ))}

                    </div>

                </section>


                <Footer />

            </main>

        </div>
    );
}

export default FindLibrary;