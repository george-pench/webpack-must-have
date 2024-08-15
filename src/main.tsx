import "./styles/main.scss";
// watch: native intellisense and file-peek for aliases from jsconfig.json and with none-js files doesn't work: https://github.com/microsoft/TypeScript/issues/29334

import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Header from "./components/Header/Header";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ErrorBoundary from "./components/ErrorBoundary";

function AppContainer() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Header />
          <ErrorBoundary fallback={<h1>Something went wrong.</h1>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </ErrorBoundary>
        </div>
      </Router>
    </AuthProvider>
  );
}

ReactDOM.createRoot(document.getElementById("app")!).render(<AppContainer />);
// React + TS: https://github.com/typescript-cheatsheets/react#reacttypescript-cheatsheets
