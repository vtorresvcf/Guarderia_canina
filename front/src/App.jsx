import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Header";
import Footer from "./components/Footer";
import Services from "./pages/Services";
import Reservation from "./pages/Reservation";
import Contact from "./pages/Contact";
import Login from "./pages/Login";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
