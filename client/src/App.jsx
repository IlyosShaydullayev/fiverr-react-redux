import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Navbar, Footer } from "./components";
import { useEffect } from "react";
import {
  getCategorys,
  getPopularCategorys,
} from "./redux/slice/categorysSlice";
import { useDispatch, useSelector } from "react-redux";
import AuthWrapper from "./pages/AuthWrapper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./pages/Profile";

function App() {
  const dispatch = useDispatch();
  const { showLogin, showRegister } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getCategorys());
    dispatch(getPopularCategorys());
  }, []);

  return ( 
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      {showLogin || showRegister ? (
        <AuthWrapper type={showLogin ? "login" : "register"} />
      ) : null}
      <Footer />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
