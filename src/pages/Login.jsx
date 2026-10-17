import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [messageColor, setMessageColor] = useState("");

    function handleLogin(event) {

        event.preventDefault();

        const cleanEmail = email.trim().toLowerCase();

        // Check empty fields
        if (cleanEmail === "" || password.trim() === "") {

            setMessage("Please enter your email and password.");
            setMessageColor("red");

            return;
        }

        // Check Gmail format
        const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

        if (!gmailPattern.test(cleanEmail)) {

            setMessage("Please enter a valid Gmail address ending with @gmail.com.");
            setMessageColor("red");

            return;
        }

        // Login successful
        setMessage("Login successful!");
        setMessageColor("green");

        setTimeout(() => {
            navigate("/dashboard");
        }, 500);
    }


    function handleSignUp() {
        alert("Sign Up page is not included in this exam project.");
    }


    function handleForgotPassword(event) {

        event.preventDefault();

        alert("Password recovery is not included in this exam project.");
    }


    return (

        <div className="login-page">

            <section className="login-hero">

                <div className="welcome-content">

                    <h1>Welcome to MyLibrary!</h1>

                    <p>
                        We provide smart library services in your hands.
                    </p>

                </div>


                <div className="login-card">

                    <h2>Sign in to MyLibrary</h2>


                    <div className="social-buttons">

                        <button type="button" className="social-button">
                            <i className="fa-brands fa-facebook-f"></i>
                        </button>

                        <button type="button" className="social-button">
                            <i className="fa-brands fa-google"></i>
                        </button>

                    </div>


                    <form onSubmit={handleLogin}>

                        <input
                        type="text"
                         id="email"
                          placeholder="Email or Phone number"
                          value={email}
                          onChange={(event) =>
                            setEmail(event.target.value)
                         }
                         />

                        <input
                            type="password"
                            id="password"
                            placeholder="Please enter your password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            required
                        />


                        <div className="login-options">

                            <a
                                href="#"
                                id="forgotPassword"
                                onClick={handleForgotPassword}
                            >
                                Forgot password?
                            </a>


                            <label>
                                <input
                                    type="checkbox"
                                    id="rememberMe"
                                />

                                Remember me
                            </label>

                        </div>


                        <button
                            type="submit"
                            className="sign-in-button"
                        >
                            SIGN IN
                        </button>

                    </form>


                    <div className="or-line">
                        or
                    </div>


                    <button
                        type="button"
                        id="signUpButton"
                        className="sign-up-button"
                        onClick={handleSignUp}
                    >
                        SIGN UP
                    </button>


                    <p
                        id="loginMessage"
                        className="login-message"
                        style={{ color: messageColor }}
                    >
                        {message}
                    </p>

                </div>

            </section>


            <footer className="login-footer">

                <a href="#">Google Play Store App</a>
                <a href="#">App Store App</a>
                <a href="#">About MyLibrary</a>
                <a href="#">About Us</a>
                <a href="#">Our Blog</a>

            </footer>

        </div>
    );
}

export default Login;
