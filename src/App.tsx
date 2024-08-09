import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";

const App: React.FC = () => {
  const isAuth =
    localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

  return (
    <Router>
      <div className="w-full">
      <Navbar isAuth={!!isAuth} />
        <Routes>
          
          {isAuth ? (
            <>
              <Route path="/" element={<Dashboard />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
            </>
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
