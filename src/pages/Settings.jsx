
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Settings.css";

const PROFILE_KEY = "myLibraryProfile";
const SETTINGS_KEY = "myLibrarySettings";
const SECURITY_KEY = "myLibrarySecurity";
const SESSIONS_KEY = "myLibrarySessions";

const DEFAULT_PROFILE = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    timezone: "Asia/Kabul",
};

const DEFAULT_SETTINGS = {
    emailNotifications: true,
    dueDateReminder: true,
    loginAlerts: true,
};

const DEFAULT_SECURITY = {
    twoFactor: false,
};

const SAMPLE_SESSIONS = [
    {
        id: "current-session",
        device: "This device",
        browser: "Current browser",
        lastActive: "Active now",
        current: true,
    },
    {
        id: "demo-session",
        device: "Example device",
        browser: "Demo session",
        lastActive: "Sample entry",
        current: false,
    },
];

const SECTIONS = [
    { id: "basic", label: "Basic Info", icon: "fa-user" },
    { id: "password", label: "Change Password", icon: "fa-lock" },
    { id: "security", label: "Security", icon: "fa-shield-halved" },
    { id: "sessions", label: "Active Sessions", icon: "fa-laptop" },
    { id: "preferences", label: "Library Preferences", icon: "fa-book-open" },
    { id: "delete", label: "Delete Account", icon: "fa-trash-can" },
];

function readStorage(key, fallback) {
    try {
        const saved = localStorage.getItem(key);
        return saved ? JSON.parse(saved) : fallback;
    } catch {
        return fallback;
    }
}

function saveStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch {
        return false;
    }
}

export default function Settings() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [activeSection, setActiveSection] = useState("basic");
    const [notice, setNotice] = useState(null);

    const [profile, setProfile] = useState(() => ({
        ...DEFAULT_PROFILE,
        ...readStorage(PROFILE_KEY, {}),
    }));

    const [preferences, setPreferences] = useState(() => ({
        ...DEFAULT_SETTINGS,
        ...readStorage(SETTINGS_KEY, {}),
    }));

    const [security, setSecurity] = useState(() => ({
        ...DEFAULT_SECURITY,
        ...readStorage(SECURITY_KEY, {}),
    }));

    const [sessions, setSessions] = useState(() => {
        const saved = readStorage(SESSIONS_KEY, SAMPLE_SESSIONS);
        return Array.isArray(saved) ? saved : SAMPLE_SESSIONS;
    });

    const [passwords, setPasswords] = useState({
        current: "",
        next: "",
        confirm: "",
    });

    const [showPasswords, setShowPasswords] = useState(false);
    const [deleteText, setDeleteText] = useState("");

    const fullName =
        `${profile.firstName} ${profile.lastName}`.trim() ||
        "Library Member";

    const initials = (
        `${profile.firstName?.[0] || "L"}${profile.lastName?.[0] || "M"}`
    ).toUpperCase();

    useEffect(() => {
        if (!notice) return undefined;

        const timer = window.setTimeout(() => setNotice(null), 5000);
        return () => window.clearTimeout(timer);
    }, [notice]);

    function showMessage(text, type = "success") {
        setNotice({ text, type });
    }

    function changeSection(sectionId) {
        setActiveSection(sectionId);
        setSidebarOpen(false);
        setNotice(null);
    }

    function handleProfileChange(event) {
        const { name, value } = event.target;
        setProfile((current) => ({ ...current, [name]: value }));
    }

    function handleProfileSubmit(event) {
        event.preventDefault();

        if (!profile.firstName.trim() || !profile.lastName.trim()) {
            showMessage("Please enter your first and last name.", "error");
            return;
        }

        if (!profile.email.trim()) {
            showMessage("Please enter your email address.", "error");
            return;
        }

        if (!saveStorage(PROFILE_KEY, profile)) {
            showMessage("Could not save your profile in this browser.", "error");
            return;
        }

        showMessage("Your profile information has been saved.");
    }

    function handlePreferenceChange(name) {
        setPreferences((current) => {
            const updated = { ...current, [name]: !current[name] };

            if (!saveStorage(SETTINGS_KEY, updated)) {
                showMessage("Could not save preferences in this browser.", "error");
                return current;
            }

            showMessage("Your library preferences have been updated.");
            return updated;
        });
    }

    function handleSecurityChange(name) {
        setSecurity((current) => {
            const updated = { ...current, [name]: !current[name] };

            if (!saveStorage(SECURITY_KEY, updated)) {
                showMessage("Could not save this setting in your browser.", "error");
                return current;
            }

            showMessage(
                "Demo setting updated. Real account security requires a backend."
            );
            return updated;
        });
    }

    function handlePasswordSubmit(event) {
        event.preventDefault();

        if (!passwords.current || !passwords.next || !passwords.confirm) {
            showMessage("Please complete all password fields.", "error");
            return;
        }

        if (passwords.next.length < 8) {
            showMessage("Your new password must have at least 8 characters.", "error");
            return;
        }

        if (!/[A-Z]/.test(passwords.next) || !/[0-9]/.test(passwords.next)) {
            showMessage(
                "Use at least one uppercase letter and one number.",
                "error"
            );
            return;
        }

        if (passwords.next !== passwords.confirm) {
            showMessage("The new passwords do not match.", "error");
            return;
        }

        setPasswords({ current: "", next: "", confirm: "" });

        showMessage(
            "Password validation passed. Your real password has not changed because this project has no authentication backend."
        );
    }

    function handleEndSession(session) {
        if (session.current) return;

        const updated = sessions.filter((item) => item.id !== session.id);
        setSessions(updated);
        saveStorage(SESSIONS_KEY, updated);

        showMessage("The sample session was removed from this browser's list.");
    }

    function handleDeleteRequest(event) {
        event.preventDefault();

        if (deleteText.trim() !== "DELETE") {
            showMessage('Type DELETE in capital letters to confirm the demo request.', "error");
            return;
        }

        setDeleteText("");

        showMessage(
            "Demo only: no account or library records were deleted.",
            "error"
        );
    }

    function renderSwitch(label, description, checked, onClick) {
        return (
            <div className="settings-option-row">
                <div className="settings-option-copy">
                    <strong>{label}</strong>
                    <p>{description}</p>
                </div>

                <button
                    type="button"
                    role="switch"
                    aria-label={label}
                    aria-checked={checked}
                    className={`settings-switch ${checked ? "on" : ""}`}
                    onClick={onClick}
                >
                    <span />
                </button>
            </div>
        );
    }

    return (
        <div className="settings-app-layout">
            <Sidebar activePage="settings" isOpen={sidebarOpen} />

            {sidebarOpen && (
                <button
                    type="button"
                    className="settings-mobile-overlay"
                    aria-label="Close navigation menu"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <div className="settings-main-column">
                <Navbar
                    title="Settings"
                    searchValue={searchValue}
                    onSearchChange={setSearchValue}
                    onMenuClick={() => setSidebarOpen((open) => !open)}
                />

                <main className="settings-page">
                    <div className="settings-page-inner">
                        <header className="settings-page-header">
                            <div>
                                <p className="settings-eyebrow">
                                    ACCOUNT PREFERENCES
                                </p>
                                <h1>Settings</h1>
                                <p className="settings-subtitle">
                                    Manage your account, security and library preferences.
                                </p>
                            </div>
                        </header>

                        {notice && (
                            <div
                                className={`settings-notice ${
                                    notice.type === "error" ? "is-error" : "is-success"
                                }`}
                                role="status"
                            >
                                <span>{notice.text}</span>
                                <button
                                    type="button"
                                    onClick={() => setNotice(null)}
                                    aria-label="Dismiss message"
                                >
                                    ×
                                </button>
                            </div>
                        )}

                        <section className="settings-account-overview">
                            <div className="settings-avatar" aria-hidden="true">
                                {initials}
                            </div>

                            <div className="settings-account-copy">
                                <span className="settings-overline">
                                    ACCOUNT OVERVIEW
                                </span>
                                <h2>{fullName}</h2>
                                <p>{profile.email || "Add your email in Basic Info."}</p>
                            </div>

                            <span className="settings-status-pill">
                                <span />
                                MyLibrary profile
                            </span>
                        </section>

                        <div className="settings-layout">
                            <aside
                                className="settings-local-nav"
                                aria-label="Settings sections"
                            >
                                <p className="settings-nav-heading">SETTINGS MENU</p>

                                {SECTIONS.map((section) => (
                                    <button
                                        type="button"
                                        key={section.id}
                                        className={`settings-nav-item ${
                                            activeSection === section.id ? "active" : ""
                                        }`}
                                        onClick={() => changeSection(section.id)}
                                        aria-current={
                                            activeSection === section.id ? "page" : undefined
                                        }
                                    >
                                        <i
                                            className={`fa-solid ${section.icon} settings-nav-icon`}
                                            aria-hidden="true"
                                        />
                                        <span>{section.label}</span>
                                    </button>
                                ))}

                                <div className="settings-nav-help">
                                    <strong>Keep your account safe</strong>
                                    <p>
                                        Use a strong password and review your security
                                        preferences regularly.
                                    </p>
                                </div>
                            </aside>

                            <div className="settings-panels">
                                {activeSection === "basic" && (
                                    <section className="settings-card">
                                        <div className="settings-card-heading">
                                            <div className="settings-card-icon">
                                                <i className="fa-solid fa-user" />
                                            </div>
                                            <div>
                                                <h2>Basic Info</h2>
                                                <p>
                                                    Update the profile information shown in
                                                    your library account.
                                                </p>
                                            </div>
                                        </div>

                                        <form onSubmit={handleProfileSubmit}>
                                            <div className="settings-form-grid">
                                                <label className="settings-field">
                                                    <span>First name</span>
                                                    <input
                                                        name="firstName"
                                                        value={profile.firstName}
                                                        onChange={handleProfileChange}
                                                        autoComplete="given-name"
                                                        placeholder="Enter first name"
                                                        required
                                                    />
                                                </label>

                                                <label className="settings-field">
                                                    <span>Last name</span>
                                                    <input
                                                        name="lastName"
                                                        value={profile.lastName}
                                                        onChange={handleProfileChange}
                                                        autoComplete="family-name"
                                                        placeholder="Enter last name"
                                                        required
                                                    />
                                                </label>

                                                <label className="settings-field">
                                                    <span>Email address</span>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={profile.email}
                                                        onChange={handleProfileChange}
                                                        autoComplete="email"
                                                        placeholder="name@example.com"
                                                        required
                                                    />
                                                </label>

                                                <label className="settings-field">
                                                    <span>Phone number <small>(optional)</small></span>
                                                    <input
                                                        type="tel"
                                                        name="phone"
                                                        value={profile.phone}
                                                        onChange={handleProfileChange}
                                                        autoComplete="tel"
                                                        placeholder="Enter phone number"
                                                    />
                                                </label>

                                                <label className="settings-field">
                                                    <span>Time zone</span>
                                                    <select
                                                        name="timezone"
                                                        value={profile.timezone}
                                                        onChange={handleProfileChange}
                                                    >
                                                        <option value="Asia/Kabul">
                                                            Kabul (UTC +04:30)
                                                        </option>
                                                        <option value="UTC">UTC</option>
                                                        <option value="Asia/Dubai">
                                                            Dubai (UTC +04:00)
                                                        </option>
                                                        <option value="Europe/London">
                                                            London
                                                        </option>
                                                    </select>
                                                </label>
                                            </div>

                                            <div className="settings-form-footer">
                                                <p>
                                                    Profile details are stored in this
                                                    browser on this device.
                                                </p>
                                                <button
                                                    type="submit"
                                                    className="settings-primary-button"
                                                >
                                                    Save changes
                                                </button>
                                            </div>
                                        </form>
                                    </section>
                                )}

                                {activeSection === "password" && (
                                    <section className="settings-card">
                                        <div className="settings-card-heading">
                                            <div className="settings-card-icon">
                                                <i className="fa-solid fa-lock" />
                                            </div>
                                            <div>
                                                <h2>Change Password</h2>
                                                <p>
                                                    Check that your new password meets
                                                    the requirements.
                                                </p>
                                            </div>
                                        </div>

                                        <form onSubmit={handlePasswordSubmit}>
                                            <div className="settings-password-fields">
                                                <label className="settings-field">
                                                    <span>Current password</span>
                                                    <input
                                                        type={showPasswords ? "text" : "password"}
                                                        value={passwords.current}
                                                        onChange={(event) =>
                                                            setPasswords((current) => ({
                                                                ...current,
                                                                current: event.target.value,
                                                            }))
                                                        }
                                                        autoComplete="current-password"
                                                        placeholder="Enter current password"
                                                        required
                                                    />
                                                </label>

                                                <label className="settings-field">
                                                    <span>New password</span>
                                                    <input
                                                        type={showPasswords ? "text" : "password"}
                                                        value={passwords.next}
                                                        onChange={(event) =>
                                                            setPasswords((current) => ({
                                                                ...current,
                                                                next: event.target.value,
                                                            }))
                                                        }
                                                        autoComplete="new-password"
                                                        placeholder="At least 8 characters"
                                                        required
                                                    />
                                                </label>

                                                <label className="settings-field">
                                                    <span>Confirm new password</span>
                                                    <input
                                                        type={showPasswords ? "text" : "password"}
                                                        value={passwords.confirm}
                                                        onChange={(event) =>
                                                            setPasswords((current) => ({
                                                                ...current,
                                                                confirm: event.target.value,
                                                            }))
                                                        }
                                                        autoComplete="new-password"
                                                        placeholder="Re-enter new password"
                                                        required
                                                    />
                                                </label>
                                            </div>

                                            <button
                                                type="button"
                                                className="settings-text-button"
                                                onClick={() =>
                                                    setShowPasswords((current) => !current)
                                                }
                                            >
                                                {showPasswords ? "Hide passwords" : "Show passwords"}
                                            </button>

                                            <div className="settings-password-hint">
                                                <strong>Password requirements</strong>
                                                <ul>
                                                    <li>At least 8 characters</li>
                                                    <li>At least one uppercase letter</li>
                                                    <li>At least one number</li>
                                                </ul>
                                            </div>

                                            <div className="settings-form-footer">
                                                <p>
                                                    Passwords are not saved in localStorage.
                                                    Actual password changes require a secure server.
                                                </p>
                                                <button
                                                    type="submit"
                                                    className="settings-primary-button"
                                                >
                                                    Validate password
                                                </button>
                                            </div>
                                        </form>
                                    </section>
                                )}

                                {activeSection === "security" && (
                                    <section className="settings-card">
                                        <div className="settings-card-heading">
                                            <div className="settings-card-icon">
                                                <i className="fa-solid fa-shield-halved" />
                                            </div>
                                            <div>
                                                <h2>Security</h2>
                                                <p>
                                                    Manage the security options shown in
                                                    this project.
                                                </p>
                                            </div>
                                        </div>

                                        {renderSwitch(
                                            "Two-factor authentication",
                                            "An additional verification step can help protect an account. This is a demo switch only.",
                                            security.twoFactor,
                                            () => handleSecurityChange("twoFactor")
                                        )}

                                        {renderSwitch(
                                            "Login alerts",
                                            "Save your preference for alerts about new sign-ins.",
                                            preferences.loginAlerts,
                                            () => handlePreferenceChange("loginAlerts")
                                        )}

                                        <div className="settings-info-box">
                                            These switches save preferences in this browser.
                                            They do not activate real authentication or send
                                            notifications without a backend service.
                                        </div>
                                    </section>
                                )}

                                {activeSection === "sessions" && (
                                    <section className="settings-card">
                                        <div className="settings-card-heading">
                                            <div className="settings-card-icon">
                                                <i className="fa-solid fa-laptop" />
                                            </div>
                                            <div>
                                                <h2>Active Sessions</h2>
                                                <p>
                                                    Review the sample session entries used
                                                    to demonstrate this interface.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="settings-info-box">
                                            Demo data only. This project cannot detect actual
                                            devices or terminate real account sessions.
                                        </div>

                                        <div className="settings-session-list">
                                            {sessions.length === 0 ? (
                                                <p className="settings-empty-state">
                                                    There are no entries in the demo list.
                                                </p>
                                            ) : (
                                                sessions.map((session) => (
                                                    <div
                                                        className="settings-session-row"
                                                        key={session.id}
                                                    >
                                                        <div className="settings-device-icon">
                                                            <i className="fa-solid fa-desktop" />
                                                        </div>

                                                        <div className="settings-session-copy">
                                                            <strong>
                                                                {session.device}
                                                                {session.current && (
                                                                    <span className="settings-current-pill">
                                                                        Current
                                                                    </span>
                                                                )}
                                                            </strong>
                                                            <p>
                                                                {session.browser} · {session.lastActive}
                                                            </p>
                                                        </div>

                                                        <button
                                                            type="button"
                                                            className="settings-text-button"
                                                            disabled={session.current}
                                                            onClick={() => handleEndSession(session)}
                                                        >
                                                            {session.current ? "This device" : "Remove sample"}
                                                        </button>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </section>
                                )}

                                {activeSection === "preferences" && (
                                    <section className="settings-card">
                                        <div className="settings-card-heading">
                                            <div className="settings-card-icon">
                                                <i className="fa-solid fa-book-open" />
                                            </div>
                                            <div>
                                                <h2>Library Preferences</h2>
                                                <p>
                                                    Choose which library reminders and
                                                    email preferences to keep enabled.
                                                </p>
                                            </div>
                                        </div>

                                        {renderSwitch(
                                            "Email notifications",
                                            "Save your preference for receiving library-related email updates.",
                                            preferences.emailNotifications,
                                            () => handlePreferenceChange("emailNotifications")
                                        )}

                                        {renderSwitch(
                                            "Due-date reminders",
                                            "Save your preference for reminders about borrowed books.",
                                            preferences.dueDateReminder,
                                            () => handlePreferenceChange("dueDateReminder")
                                        )}

                                        <p className="settings-inline-note">
                                            These preferences are stored locally. Sending
                                            emails or reminders requires a backend or notification service.
                                        </p>
                                    </section>
                                )}

                                {activeSection === "delete" && (
                                    <section className="settings-card settings-danger-card">
                                        <div className="settings-card-heading">
                                            <div className="settings-card-icon settings-danger-icon">
                                                <i className="fa-solid fa-trash-can" />
                                            </div>
                                            <div>
                                                <h2>Delete Account</h2>
                                                <p>
                                                    Review the demo confirmation before
                                                    connecting account deletion to a server.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="settings-danger-content">
                                            <strong>Permanent account deletion</strong>
                                            <p>
                                                This interface cannot delete a real account.
                                                Actual deletion must be handled by a protected
                                                backend after verifying the signed-in user.
                                            </p>
                                        </div>

                                        <form
                                            className="settings-delete-form"
                                            onSubmit={handleDeleteRequest}
                                        >
                                            <label className="settings-field">
                                                <span>Type DELETE to test the confirmation</span>
                                                <input
                                                    value={deleteText}
                                                    onChange={(event) =>
                                                        setDeleteText(event.target.value)
                                                    }
                                                    placeholder="Type DELETE"
                                                    autoComplete="off"
                                                />
                                            </label>

                                            <button
                                                type="submit"
                                                className="settings-danger-button"
                                            >
                                                Confirm demo request
                                            </button>
                                        </form>

                                        <p className="settings-inline-note">
                                            Submitting this form will not delete your account
                                            or your library records.
                                        </p>
                                    </section>
                                )}

                                <p className="settings-page-footnote">
                                    MyLibrary · Account Settings
                                </p>
                            </div>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    );
}
