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

const GraficoServicios = () => {
  const [filterData, setFilterData] = useState([]);
  const { servicios, reservations } = useReservationStore();

  useEffect(() => {
    const result = servicios.map(({ id, name }) => ({ id, name }));

    const resultadoFinal = reservations.reduce((acc, reserva) => {
      acc[reserva.id_services] =
        (acc[reserva.id_services] || 0) + reserva.places;
      return acc;
    }, {});

    // Combinar las places de resultadoFinal en el objeto result
    const updatedResult = result.map((item) => ({
      ...item,
      places: resultadoFinal[item.id] || 0, // Añadir places o 0 si no hay coincidencia
    }));

    setFilterData(updatedResult);
  }, [servicios, reservations]);

  return (
    <div className="p-4 bg-white shadow-md rounded-2xl">
      <h2 className="text-xl font-bold mb-4 text-center">
        Plazas por servicio
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={filterData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="places" fill="black" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraficoServicios;
