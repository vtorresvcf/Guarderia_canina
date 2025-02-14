import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useReservationStore from "../store/store";
import { useEffect, useState } from "react";

const GraficoServicios = ({ text }) => {
  const [filterData, setFilterData] = useState([]);
  const [filterServicios, setFilterServicios] = useState([]);
  const { servicios, reservations, usuarios } = useReservationStore();

  useEffect(() => {
    if (!servicios?.length || !reservations?.length || !usuarios?.length)
      return;
    if (text === "usuarios") {
      const countReservasUsers = usuarios.map(({ id, name }) => {
        const numReservas = reservations.filter(
          (reserva) => reserva.id_user === id
        ).length;
        return { id, name, plazas: numReservas };
      });
      setFilterServicios(countReservasUsers);
    }
    if (text === "servicios") {
      const plazasUsadasServicio = servicios.map(({ id, name }) => {
        const totalPlazas = reservations
          .filter((reserva) => reserva.id_services === id)
          .reduce((acc, res) => acc + res.places, 0);

        return { id, name, plazas: totalPlazas };
      });

      setFilterData(plazasUsadasServicio);
    }
  }, [servicios, reservations, usuarios, text]);

  return (
    <div className="p-4 bg-white shadow-md rounded-2xl mb-10">
      <h2 className="text-xl font-bold mb-4 text-center">
        {text === "servicios"
          ? "Total plazas ocupadas por servicio"
          : "Total reservas por usuario"}
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={text === "servicios" ? filterData : filterServicios}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="plazas" fill="black" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraficoServicios;
