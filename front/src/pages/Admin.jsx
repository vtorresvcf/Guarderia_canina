import { useState, useEffect } from "react";
import Admin_lateral from "../components/Admin_lateral";
import Admin_Reservas from "../components/Admin_Reservas";
import useReservationStore from "../store/store";
import Admin_Central from "../components/Admin_Central";

const Admin = () => {
  const [selection, setSelection] = useState("");
  const { getAllAdmin } = useReservationStore();

  useEffect(() => {
    getAllAdmin();
  }, [getAllAdmin]);

  return (
    <div className="min-h-full ">
      <div className="flex h-screen">
        <Admin_lateral setSelection={setSelection} selection={selection} />
        <div className="bg-slate-100 w-3/4 border border-slate-500">
          <div className="h-10 border border-slate-500 flex justify-center items-center text-xl md:text-3xl font-mono text-black bg-white font-extrabold  ">
            Administrador
          </div>
          <div className="border border-slate-500 h-full">
            {selection === "servicios" && <Admin_Central text="servicios" />}
            {selection === "reservas" && <Admin_Reservas />}
            {selection === "contabilidad" && "Contenido de contabilidad"}
            {selection === "usuarios" && <Admin_Central text="usuarios" />}
            {!selection && <p>Selecciona una sección</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
