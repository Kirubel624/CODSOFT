import { Route, Routes, useLocation } from "react-router-dom";
import logo from "./logo.svg";
import HomePage from "./pages/quiz/HomePage";
import NavBar from "./components/common/NavBar";
import QuizTaking from "./pages/quiz/QuizTaking";
import CreateQuiz from "./pages/quiz/CreateQuiz";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Modal } from "antd";
import AuthenticationPage from "./components/auth/Authentication";
import Leaderboard from "./pages/quiz/LeaderBoard";

// Add the ScrollToTop component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [isModalOpenLogin, setIsModalOpenLogin] = useState(false);
  const handleCancelLogin = () => {
    setIsModalOpenLogin(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
        <ScrollToTop /> 
        <Routes>
          <Route element={<HomePage />} path="/" />
          <Route
            element={
              isLoggedIn ? (
                <QuizTaking />
              ) : (
                <Modal
                  onCancel={handleCancelLogin}
                  footer={null}
                  width={800}
                  title="Login"
                  open={true}
                >
                  <AuthenticationPage />
                </Modal>
              )
            }
            path="/takequiz/:id"
          />
          <Route
            element={
              isLoggedIn ? (
                <CreateQuiz />
              ) : (
                <Modal
                  onCancel={handleCancelLogin}
                  footer={null}
                  width={800}
                  title="Login"
                  open={true}
                >
                  <AuthenticationPage />
                </Modal>
              )
            }
            path="/createquiz"
          />
          <Route element={<Leaderboard />} path="/leaderboard" />
        </Routes>
      </header>
    </div>
  );
}

export default App;
