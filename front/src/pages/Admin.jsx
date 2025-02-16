import { useState, useEffect } from "react";
import Admin_lateral from "../components/Admin_lateral";
import Admin_Reservas from "../components/Admin_Reservas";
import useReservationStore from "../store/store";
import Admin_Central from "../components/Admin_Central";
import Admin_Contabilidad from "../components/Admin_Contabilidad";
import Admin_Principal from "../components/Admin_Principal";
import GraficoResumen from "../components/GraficoResumen";

const Admin = () => {
  const [selection, setSelection] = useState("home");
  const { getAllAdmin, logout, reservations, servicios, usuarios } =
    useReservationStore();

  useEffect(() => {
    getAllAdmin();
  }, [getAllAdmin]);

  const components = {
    servicios: <Admin_Central text="servicios" />,
    reservas: <Admin_Reservas />,
    contabilidad: <Admin_Contabilidad />,
    usuarios: <Admin_Central text="usuarios" />,
    home: (
      <div className="flex flex-col gap-24">
        <div className="w-full min-h-40 flex flex-wrap gap-5 justify-center items-center py-14 ">
          <Admin_Principal data={reservations} text="reservas" />
          <Admin_Principal data={servicios} text="servicios" />
          <Admin_Principal data={usuarios} text="usuarios" />
        </div>
        <div className="bg-white w-2/3 h-auto mx-auto shadow-xl">
          <h1 className="text-center py-4 text-2xl font-semibold">
            Gráfico de plazas reservadas
          </h1>
          <GraficoResumen reservations={reservations} />
        </div>
      </div>
    ),
  };

  return (
    <div className="h-screen w-screen flex">
      <Admin_lateral setSelection={setSelection} selection={selection} />

      <div className="bg-slate-100 flex-1 flex flex-col border border-slate-500">
        <div className="h-16 flex items-center font-mono text-black bg-white font-extrabold border-b border-slate-500">
          <h1 className="text-xl md:text-3xl flex-1 text-center">
            Usuario Administrador
          </h1>
          <button
            onClick={logout}
            className="bg-black text-white hover:text-slate-200 transition-all duration-75 rounded-xl p-1 mr-6"
          >
            Cerrar
          </button>
        </div>

        <div className="flex-1 overflow-auto">{components[selection]}</div>
      </div>
    </div>
  );
};

export default Admin;
