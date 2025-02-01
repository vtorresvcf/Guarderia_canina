import { useState, useEffect } from "react";
import Admin_lateral from "../components/Admin_lateral";
import Admin_Reservas from "../components/Admin_Reservas";
import useReservationStore from "../store/store";
import Admin_Central from "../components/Admin_Central";

const Admin = () => {
  const [selection, setSelection] = useState("");
  const { getAllAdmin, logout } = useReservationStore();

  useEffect(() => {
    getAllAdmin();
  }, [getAllAdmin]);

  return (
    <div className="h-screen w-screen">
      <div className="flex h-full">
        {/* Barra lateral */}
        <Admin_lateral setSelection={setSelection} selection={selection} />

        {/* Contenido principal */}
        <div className="bg-slate-100 flex-1 border border-slate-500 flex flex-col">
          {/* Encabezado */}
          <div className="h-16 border border-slate-500 flex items-center font-mono text-black bg-white font-extrabold">
            <h1 className="text-xl md:text-3xl flex-1 text-center">
              Administrador
            </h1>
            <button
              onClick={logout}
              className="bg-black text-white hover:text-slate-200 transition-all duration-75 rounded-xl p-1 mr-6"
            >
              Cerrar
            </button>
          </div>

          {/* Contenido dinámico */}
          <div className="flex-1 border border-slate-500 overflow-auto">
            {selection === "servicios" && <Admin_Central text="servicios" />}
            {selection === "reservas" && <Admin_Reservas />}
            {selection === "contabilidad" && "Contenido de contabilidad"}
            {selection === "usuarios" && <Admin_Central text="usuarios" />}
            {!selection && <p className="p-4">Selecciona una sección</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
