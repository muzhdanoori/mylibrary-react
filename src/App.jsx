import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import FindBook from "./pages/FindBook";
import FindLibrary from "./pages/FindLibrary";
import BookMarketStore from "./pages/BookMarketStore";
import FindStudyCenter from "./pages/FindStudyCenter";
import ReadingProfile from "./pages/ReadingProfile";
import Settings from "./pages/Settings";
import SignUp from "./SignUp";

function App() {

    return (

        <Routes>

            <Route
                path="/"
                element={<Login />}
            />
          <Route
                  path="/signup"
                  element={<SignUp/>}
          />

            <Route
                path="/dashboard"
                element={<Dashboard />}
            />

            <Route
                path="/find-book"
                element={<FindBook />}
            />

            <Route
                path="/find-library"
                element={<FindLibrary />}
            />
            <Route
            path="/book-market-store"
            element={<BookMarketStore/>}/>
            <Route 
            path="/find-study-center"
            element={<FindStudyCenter/>}/>
            
             <Route
                path="/reading-profile"
                element={<ReadingProfile />}
            />
            <Route
            path="/settings"
            element={<Settings/>
            }
            />
            

        </Routes>

    );
}

export default App;