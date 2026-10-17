import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Settings.css";

const PROFILE_KEY = "myLibraryProfile";
const PREFERENCES_KEY = "myLibrarySettings";
const SECURITY_KEY = "myLibrarySecurity";
const SESSIONS_KEY = "myLibrarySessions";

const DEFAULT_PROFILE = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  language: "English",
  timezone: "Asia/Kabul",
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
    id: "sample-session-2",
    device: "Other browser (sample)",
    browser: "Demo session",
    lastActive: "Example entry",
    current: false,
  },
];

function readStorage(key, fallback) {
  if (typeof window === "undefined") return fallback;

  try {
    const saved = window.localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function saveStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

const SETTINGS_SECTIONS = [
  { id: "basic", label: "Basic Info", icon: "▦" },
  { id: "password", label: "Password", icon: "▣" },
  { id: "security", label: "Security", icon: "◇" },
  { id: "sessions", label: "Active Sessions", icon: "▤" },
  { id: "delete", label: "Delete Account", icon: "⌫" },
];

export default function Settings() {
  const [activeSection, setActiveSection] = useState("basic");

  const [profile, setProfile] = useState(() => ({
    ...DEFAULT_PROFILE,
    ...readStorage(PROFILE_KEY, {}),
  }));

  const [darkMode, setDarkMode] = useState(() => {
    const preferences = readStorage(PREFERENCES_KEY, {});

    if (typeof preferences.darkMode === "boolean") {
      return preferences.darkMode;
    }

    return preferences.theme === "dark";
  });

  const [twoFactor, setTwoFactor] = useState(
    () => readStorage(SECURITY_KEY, {}).twoFactor ?? false
  );

  const [loginAlerts, setLoginAlerts] = useState(
    () => readStorage(SECURITY_KEY, {}).loginAlerts ?? true
  );

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
  const [notice, setNotice] = useState(null);

  const fullName =
    `${profile.firstName} ${profile.lastName}`.trim() || "Library Member";

  const initials =
    `${profile.firstName?.[0] || "L"}${
      profile.lastName?.[0] || "M"
    }`.toUpperCase();

  // Save profile details in this browser.
  useEffect(() => {
    if (!saveStorage(PROFILE_KEY, profile)) {
      setNotice({
        type: "error",
        text: "Could not save profile information in this browser.",
      });
    }
  }, [profile]);

  // Apply the theme.
  useEffect(() => {
    document.documentElement.classList.toggle("dark-mode", darkMode);

    const preferences = readStorage(PREFERENCES_KEY, {});

    saveStorage(PREFERENCES_KEY, {
      ...preferences,
      darkMode,
      theme: darkMode ? "dark" : "light",
    });
  }, [darkMode]);

  // Save security preferences.
  useEffect(() => {
    saveStorage(SECURITY_KEY, {
      twoFactor,
      loginAlerts,
    });
  }, [twoFactor, loginAlerts]);

  // Save the sample session list.
  useEffect(() => {
    saveStorage(SESSIONS_KEY, sessions);
  }, [sessions]);

  // Automatically hide notifications.
  useEffect(() => {
    if (!notice) return undefined;

    const timeoutId = window.setTimeout(() => {
      setNotice(null);
    }, 4500);

    return () => window.clearTimeout(timeoutId);
  }, [notice]);

  function showMessage(text, type = "success") {
    setNotice({ text, type });
  }

  function handleProfileChange(event) {
    const { name, value } = event.target;

    setProfile((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleProfileSubmit(event) {
    event.preventDefault();

    if (!profile.firstName.trim() || !profile.lastName.trim()) {
      showMessage(
        "Please enter both your first name and last name.",
        "error"
      );
      return;
    }

    if (!profile.email.trim()) {
      showMessage("Please enter your email address.", "error");
      return;
    }

    if (!saveStorage(PROFILE_KEY, profile)) {
      showMessage(
        "Could not save profile information in this browser.",
        "error"
      );
      return;
    }

    showMessage("Your profile information has been saved in this browser.");
  }

  function handlePasswordSubmit(event) {
    event.preventDefault();

    if (
      !passwords.current ||
      !passwords.next ||
      !passwords.confirm
    ) {
      showMessage("Please complete all password fields.", "error");
      return;
    }

    if (passwords.next.length < 8) {
      showMessage(
        "The new password must contain at least 8 characters.",
        "error"
      );
      return;
    }

    if (
      !/[A-Z]/.test(passwords.next) ||
      !/[0-9]/.test(passwords.next)
    ) {
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

    setPasswords({
      current: "",
      next: "",
      confirm: "",
    });

    showMessage(
      "The form is valid. A secure backend is required to change your real password."
    );
  }

  function handleEndSession(session) {
    if (session.current) return;

    setSessions((current) =>
      current.filter((item) => item.id !== session.id)
    );

    showMessage(
      "The sample session was removed from this browser's list."
    );
  }

  function handleDeleteRequest(event) {
    event.preventDefault();

    if (deleteText.trim().toUpperCase() !== "DELETE") {
      showMessage(
        "Type DELETE exactly to confirm this demo request.",
        "error"
      );
      return;
    }

    setDeleteText("");

    showMessage(
      "This is only a demo request. No account was deleted; connect a protected backend for real account deletion.",
      "error"
    );
  }

  return (
    <div className="settings-app-layout">
      <Sidebar />

      <div className="settings-main-column">
        <Navbar />

        <main className="settings-page">
          <div className="settings-page-inner">
            {/* Page heading */}
            <header className="settings-page-header">
              <div>
                <p className="settings-eyebrow">
                  ACCOUNT PREFERENCES
                </p>

                <h1>Settings</h1>

                <p className="settings-subtitle">
                  Manage your profile, security, and library preferences.
                </p>
              </div>

              <button
                type="button"
                className="settings-theme-button"
                onClick={() => setDarkMode((current) => !current)}
                aria-pressed={darkMode}
              >
                <span aria-hidden="true">
                  {darkMode ? "☀" : "☾"}
                </span>

                {darkMode ? "Light mode" : "Dark mode"}
              </button>
            </header>

            {/* Notifications */}
            {notice && (
              <div
                className={`settings-notice ${
                  notice.type === "error"
                    ? "is-error"
                    : "is-success"
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

            {/* Account overview */}
            <section
              className="settings-account-overview"
              aria-label="Account overview"
            >
              <div className="settings-avatar" aria-hidden="true">
                {initials}
              </div>

              <div className="settings-account-copy">
                <span className="settings-overline">
                  ACCOUNT OVERVIEW
                </span>

                <h2>{fullName}</h2>

                <p>
                  {profile.email ||
                    "Add your email address in Basic Info."}
                </p>
              </div>

              <span className="settings-status-pill">
                <span />
                Profile
              </span>
            </section>

            {/* Settings layout */}
            <div className="settings-layout">
              {/* Settings navigation */}
              <aside
                className="settings-local-nav"
                aria-label="Settings sections"
              >
                <p className="settings-nav-heading">
                  SETTINGS MENU
                </p>

                {SETTINGS_SECTIONS.map((section) => (
                  <button
                    type="button"
                    key={section.id}
                    className={`settings-nav-item ${
                      activeSection === section.id ? "active" : ""
                    }`}
                    onClick={() =>
                      setActiveSection(section.id)
                    }
                    aria-current={
                      activeSection === section.id
                        ? "page"
                        : undefined
                    }
                  >
                    <span
                      className="settings-nav-icon"
                      aria-hidden="true"
                    >
                      {section.icon}
                    </span>

                    <span>{section.label}</span>
                  </button>
                ))}

                <div className="settings-nav-help">
                  <strong>Keep your account safe</strong>

                  <p>
                    Use a strong password and review your security
                    settings regularly.
                  </p>
                </div>
              </aside>

              {/* Settings content */}
              <div className="settings-panels">
                {/* Basic information */}
                {activeSection === "basic" && (
                  <>
                    <section className="settings-card">
                      <div className="settings-card-heading">
                        <div
                          className="settings-card-icon"
                          aria-hidden="true"
                        >
                          ▦
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
                            <span>
                              Phone number <small>(optional)</small>
                            </span>

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
                            <span>Preferred language</span>

                            <select
                              name="language"
                              value={profile.language}
                              onChange={handleProfileChange}
                            >
                              <option value="English">English</option>
                              <option value="Dari">Dari</option>
                              <option value="Pashto">Pashto</option>
                            </select>
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

                    {/* Display preferences */}
                    <section className="settings-card settings-preference-card">
                      <div className="settings-card-heading">
                        <div
                          className="settings-card-icon"
                          aria-hidden="true"
                        >
                          ☼
                        </div>

                        <div>
                          <h2>Display Preferences</h2>

                          <p>
                            Adjust the appearance of the library
                            website.
                          </p>
                        </div>
                      </div>

                      <div className="settings-preference-row">
                        <div>
                          <strong>Dark mode</strong>

                          <p>
                            Switch the website to a darker colour
                            theme.
                          </p>
                        </div>

                        <button
                          type="button"
                          role="switch"
                          aria-checked={darkMode}
                          aria-label="Dark mode"
                          className={`settings-switch ${
                            darkMode ? "on" : ""
                          }`}
                          onClick={() =>
                            setDarkMode((current) => !current)
                          }
                        >
                          <span />
                        </button>
                      </div>

                      <div className="settings-preference-row">
                        <div>
                          <strong>Login alerts</strong>

                          <p>
                            Keep the preference for login alerts
                            enabled or disabled.
                          </p>
                        </div>

                        <button
                          type="button"
                          role="switch"
                          aria-checked={loginAlerts}
                          aria-label="Login alerts"
                          className={`settings-switch ${
                            loginAlerts ? "on" : ""
                          }`}
                          onClick={() =>
                            setLoginAlerts((current) => !current)
                          }
                        >
                          <span />
                        </button>
                      </div>

                      <p className="settings-inline-note">
                        Login alerts are saved locally here. Sending
                        real alerts requires a backend or notification
                        service.
                      </p>
                    </section>
                  </>
                )}

                {/* Password */}
                {activeSection === "password" && (
                  <section className="settings-card">
                    <div className="settings-card-heading">
                      <div
                        className="settings-card-icon"
                        aria-hidden="true"
                      >
                        ▣
                      </div>

                      <div>
                        <h2>Change Password</h2>

                        <p>
                          Validate your new password before
                          connecting the form to authentication.
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
                        {showPasswords
                          ? "Hide passwords"
                          : "Show passwords"}
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
                          The password is never saved in localStorage.
                          Actual password changes require a secure
                          server.
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

                {/* Security */}
                {activeSection === "security" && (
                  <section className="settings-card">
                    <div className="settings-card-heading">
                      <div
                        className="settings-card-icon"
                        aria-hidden="true"
                      >
                        ◇
                      </div>

                      <div>
                        <h2>Security</h2>

                        <p>
                          Manage the security options shown for your
                          account.
                        </p>
                      </div>
                    </div>

                    <div className="settings-security-row">
                      <div
                        className="settings-security-icon"
                        aria-hidden="true"
                      >
                        ◇
                      </div>

                      <div className="settings-security-copy">
                        <strong>
                          Two-factor authentication
                        </strong>

                        <p>
                          {twoFactor
                            ? "Enabled in this browser's demo settings."
                            : "An extra verification step can help protect your account."}
                        </p>

                        <small>
                          A real two-factor flow must be connected
                          to your authentication backend.
                        </small>
                      </div>

                      <button
                        type="button"
                        role="switch"
                        aria-checked={twoFactor}
                        aria-label="Two-factor authentication"
                        className={`settings-switch ${
                          twoFactor ? "on" : ""
                        }`}
                        onClick={() =>
                          setTwoFactor((current) => !current)
                        }
                      >
                        <span />
                      </button>
                    </div>

                    <div className="settings-security-row">
                      <div
                        className="settings-security-icon"
                        aria-hidden="true"
                      >
                        ♧
                      </div>

                      <div className="settings-security-copy">
                        <strong>Login alerts</strong>

                        <p>
                          Keep a local preference for login
                          notifications.
                        </p>

                        <small>
                          This option will not send notifications
                          until connected to a server.
                        </small>
                      </div>

                      <button
                        type="button"
                        role="switch"
                        aria-checked={loginAlerts}
                        aria-label="Login alerts"
                        className={`settings-switch ${
                          loginAlerts ? "on" : ""
                        }`}
                        onClick={() =>
                          setLoginAlerts((current) => !current)
                        }
                      >
                        <span />
                      </button>
                    </div>

                    <div className="settings-info-box">
                      For real account security, verify these
                      settings on your server. Browser storage alone
                      cannot secure or protect a user account.
                    </div>
                  </section>
                )}

                {/* Active sessions */}
                {activeSection === "sessions" && (
                  <section className="settings-card">
                    <div className="settings-card-heading">
                      <div
                        className="settings-card-icon"
                        aria-hidden="true"
                      >
                        ▤
                      </div>

                      <div>
                        <h2>Active Sessions</h2>

                        <p>
                          Review and remove entries in this browser's
                          demo session list.
                        </p>
                      </div>
                    </div>

                    <div className="settings-session-list">
                      {sessions.length === 0 ? (
                        <p className="settings-empty-state">
                          There are no sessions in the demo list.
                        </p>
                      ) : (
                        sessions.map((session) => (
                          <div
                            className="settings-session-row"
                            key={session.id}
                          >
                            <div
                              className="settings-device-icon"
                              aria-hidden="true"
                            >
                              ▤
                            </div>

                            <div className="settings-session-copy">
                              <strong>
                                {session.device}

                                {session.current && (
                                  <span className="settings-current-pill">
                                    This device
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
                              {session.current
                                ? "Current"
                                : "End session"}
                            </button>
                          </div>
                        ))
                      )}
                    </div>

                    <p className="settings-inline-note">
                      These entries are examples saved locally.
                      Connect an authentication API to list or
                      terminate real sessions.
                    </p>
                  </section>
                )}

                {/* Delete account */}
                {activeSection === "delete" && (
                  <section className="settings-card settings-danger-card">
                    <div className="settings-card-heading">
                      <div
                        className="settings-card-icon settings-danger-icon"
                        aria-hidden="true"
                      >
                        ⌫
                      </div>

                      <div>
                        <h2>Delete Account</h2>

                        <p>
                          Understand what is required before
                          permanently deleting an account.
                        </p>
                      </div>
                    </div>

                    <div className="settings-danger-content">
                      <strong>Permanent account deletion</strong>

                      <p>
                        This interface cannot delete an actual
                        account. A real deletion must be performed by
                        a protected backend after verifying the
                        signed-in user and confirming the request.
                      </p>
                    </div>

                    <form
                      className="settings-delete-form"
                      onSubmit={handleDeleteRequest}
                    >
                      <label className="settings-field">
                        <span>
                          Type DELETE to test the confirmation flow
                        </span>

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
                      Submitting this form will not delete your
                      account or your library records.
                    </p>
                  </section>
                )}

                <p className="settings-page-footnote">
                  My Library · Account settings
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