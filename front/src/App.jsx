import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Header";
import Footer from "./components/Footer";
import Services from "./pages/Services";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
