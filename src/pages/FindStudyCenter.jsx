import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function FindStudyCenter() {

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [search, setSearch] = useState("");



    const centers = [
    {
        name: "Central Study Center",
        type: "Library",
        description: "Quiet place for studying and reading.",
        location: "Kabul"
    },
    {
        name: "Computer Study Center",
        type: "Computer Center",
        description: "Computer facilities for students.",
        location: "Kabul"
    },
    {
        name: "Language Study Center",
        type: "Language Center",
        description: "Learn English and other languages.",
        location: "Kabul"
    },
    {
        name: "Education Center",
        type: "Education Center",
        description: "Learning programs for students.",
        location: "Kabul"
    }
];
const filteredCenters = centers.filter((center) =>
    center.name.toLowerCase().includes(search.toLowerCase().trim())
);

    return (
        <div className="library-layout">

            <Sidebar
                activePage="find-study-center"
                isOpen={sidebarOpen}
            />

            <main className="main-content">

                <Navbar
                    title="Find Study Center"
                    onMenuClick={() =>
                        setSidebarOpen(!sidebarOpen)
                    }
                />

                {/* content will come here */}
         <section className="hero-section">
            <section className="white-section">

    <h2>Study Centers</h2>

    <p className="section-description">
        Explore study centers and choose the best place for learning.
    </p>

    <div className="service-grid">

    {filteredCenters.map((center) => (

        <div className="service-card" key={center.name}>

            <i className="fa-solid fa-graduation-cap"></i>

            <div>

                <h3>{center.name}</h3>

                <p>{center.description}</p>

                <span>
                    <i className="fa-solid fa-location-dot"></i>
                    {center.location}
                </span>

                <button
                    className="details-button"
                    onClick={() =>
                        alert(
                            `${center.name} - ${center.location}`
                        )
                    }
                >
                    View Details
                </button>

            </div>

        </div>

    ))}

</div>

</section>

    <h1>Find a Study Center</h1>

    <p>
        Find the best study centers for studying and learning.
    </p>

    <div className="search-area">

        <input
    type="text"
    placeholder="Search study center..."
    value={search}
    onChange={(event) =>
        setSearch(event.target.value)
    }
/>
    

        <select>
            <option value="">All Centers</option>
            <option value="Library">Library</option>
            <option value="Computer">Computer Center</option>
            <option value="Language">Language Center</option>
            <option value="Education">Education Center</option>
        </select>

        <button>
            Search
        </button>

    </div>

</section>

                <Footer />

            </main>

        </div>
    );
}

export default FindStudyCenter;