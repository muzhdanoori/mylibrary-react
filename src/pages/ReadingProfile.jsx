import { useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/ReadingProfile.css";

function ReadingProfile() {

    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        genre: "",
        format: "",
        author: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const nextStep = (event) => {
        event.preventDefault();

        if (
            formData.firstName === "" ||
            formData.lastName === "" ||
            formData.email === "" ||
            formData.phone === ""
        ) {
            alert("Please complete all required fields.");
            return;
        }

        setStep(2);
    };

    const saveProfile = (event) => {
        event.preventDefault();

        if (formData.genre === "" || formData.format === "") {
            alert("Please select your genre and preferred format.");
            return;
        }

        alert("Your reading profile has been saved!");
    };

    return (
        <div className="profile-layout">

            {/* Sidebar */}
            <Sidebar
                activePage="reading-profile"
                isOpen={true}
            />

            {/* Main Content */}
            <div className="profile-page">

                {/* Page Header */}
                <div className="profile-header">
                    <h1>Build Your Reading Profile</h1>

                    <p>
                        Tell us a little about yourself to personalize
                        your library experience.
                    </p>
                </div>


                {/* Steps */}
                <div className="steps">

                    <div className={`step ${step >= 1 ? "active" : ""}`}>
                        <span>1</span>
                        <p>Personal Information</p>
                    </div>

                    <div className="step-line"></div>

                    <div className={`step ${step >= 2 ? "active" : ""}`}>
                        <span>2</span>
                        <p>Reading Preferences</p>
                    </div>

                </div>


                {/* Form */}
                <div className="profile-card">

                    {/* Step 1 */}
                    {step === 1 && (

                        <form onSubmit={nextStep}>

                            <h2>Personal Information</h2>

                            <p className="form-description">
                                Tell us a little about yourself.
                            </p>


                            <div className="form-row">

                                <div className="form-group">

                                    <label>First Name *</label>

                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="Enter your first name"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                    />

                                </div>


                                <div className="form-group">

                                    <label>Last Name *</label>

                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="Enter your last name"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                    />

                                </div>

                            </div>


                            <div className="form-row">

                                <div className="form-group">

                                    <label>Email Address *</label>

                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />

                                </div>


                                <div className="form-group">

                                    <label>Phone Number *</label>

                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Enter your phone number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />

                                </div>

                            </div>


                            <div className="button-container">

                                <button
                                    type="submit"
                                    className="next-button"
                                >
                                    NEXT
                                </button>

                            </div>

                        </form>

                    )}


                    {/* Step 2 */}
                    {step === 2 && (

                        <form onSubmit={saveProfile}>

                            <h2>Reading Preferences</h2>

                            <p className="form-description">
                                Tell us what you like to read.
                            </p>


                            {/* Favorite Genre */}
                            <div className="form-group">

                                <label>Favorite Genre *</label>

                                <select
                                    name="genre"
                                    value={formData.genre}
                                    onChange={handleChange}
                                >

                                    <option value="">
                                        Select your favorite genre
                                    </option>

                                    <option value="Fiction">
                                        Fiction
                                    </option>

                                    <option value="Science">
                                        Science
                                    </option>

                                    <option value="Technology">
                                        Technology
                                    </option>

                                    <option value="History">
                                        History
                                    </option>

                                    <option value="Mathematics">
                                        Mathematics
                                    </option>

                                    <option value="Literature">
                                        Literature
                                    </option>

                                </select>

                            </div>


                            {/* Preferred Format */}
                            <div className="form-group">

                                <label>Preferred Format *</label>

                                <div className="format-options">

                                    <label>

                                        <input
                                            type="radio"
                                            name="format"
                                            value="Physical Book"
                                            checked={
                                                formData.format === "Physical Book"
                                            }
                                            onChange={handleChange}
                                        />

                                        Physical Book

                                    </label>


                                    <label>

                                        <input
                                            type="radio"
                                            name="format"
                                            value="E-Book"
                                            checked={
                                                formData.format === "E-Book"
                                            }
                                            onChange={handleChange}
                                        />

                                        E-Book

                                    </label>


                                    <label>

                                        <input
                                            type="radio"
                                            name="format"
                                            value="Audiobook"
                                            checked={
                                                formData.format === "Audiobook"
                                            }
                                            onChange={handleChange}
                                        />

                                        Audiobook

                                    </label>

                                </div>

                            </div>


                            {/* Favorite Author */}
                            <div className="form-group">

                                <label>Favorite Author</label>

                                <input
                                    type="text"
                                    name="author"
                                    placeholder="Enter your favorite author"
                                    value={formData.author}
                                    onChange={handleChange}
                                />

                            </div>


                            {/* Buttons */}
                            <div className="button-container">

                                <button
                                    type="button"
                                    className="back-button"
                                    onClick={() => setStep(1)}
                                >
                                    BACK
                                </button>


                                <button
                                    type="submit"
                                    className="save-button"
                                >
                                    SAVE PROFILE
                                </button>

                            </div>

                        </form>

                    )}

                </div>

            </div>

        </div>
    );
}

export default ReadingProfile;