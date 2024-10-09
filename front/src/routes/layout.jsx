import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import App from "../App";

const Layout = () => {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<App />} />
      </Routes>
    </div>
  );
};

export default Layout;
