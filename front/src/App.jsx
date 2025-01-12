import { Routes, Route, Navigate } from "react-router-dom";
import useReservationStore from "./store/store";
import Home from "./pages/Home";
import Navbar from "./components/Header";
import Footer from "./components/Footer";
import Services from "./pages/Services";
import Reservation from "./pages/Reservation";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ConsultaReservas from "./pages/ConsultaReservas";
import Admin from "./pages/Admin";

const App = () => {
  const { user } = useReservationStore(); // Obtenemos el estado del usuario

  return (
    <>
      {/* Mostrar Navbar y Footer solo si no es admin */}
      {!user.is_admin && <Navbar />}

      <Routes>
        {/* Ruta para administrador */}
        {user.is_admin && <Route path="/admin" element={<Admin />} />}

        {/* Rutas generales solo visibles si no es admin */}
        {!user.is_admin && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/consultaReservas" element={<ConsultaReservas />} />
          </>
        )}

        {/* Redirigir cualquier ruta no encontrada según el rol */}
        <Route
          path="*"
          element={<Navigate to={user.is_admin ? "/admin" : "/"} replace />}
        />
      </Routes>

      {/* Mostrar Footer solo si no es admin */}
      {!user.is_admin && <Footer />}
    </>
  );
};

export default App;
