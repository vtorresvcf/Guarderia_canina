import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
