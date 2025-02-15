import { useEffect } from "react";
import useReservationStore from "../store/store";

const Admin_Contabilidad = () => {
  const { servicios, reservations } = useReservationStore();

  const res = servicios.map(({ id, name }) => {
    const precioTotal = (reservations || [])
      .filter((reserva) => reserva.id_services === id)
      .reduce((acc, res) => acc + Number(res.totalPrice), 0);

    return { id, name, total: precioTotal };
  });

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const groupByMonthAndYear = (data) => {
    const monthlyTotals = {};

    // Inicializar todos los meses de los tres años con 0
    for (let year = 2023; year <= 2025; year++) {
      monthlyTotals[year] = {};
      for (let i = 0; i < 12; i++) {
        monthlyTotals[year][i] = 0;
      }
    }

    // Sumar los precios por mes y año
    data.forEach((item) => {
      const createdAt = new Date(
        item.created_at.split(" ")[0].split("-").reverse().join("-")
      );
      const createdMonth = createdAt.getMonth(); // Mes (0-11)
      const createdYear = createdAt.getFullYear(); // Año

      if (createdYear >= 2023 && createdYear <= 2025) {
        const month = createdMonth; // Usamos directamente el mes de 0-11
        monthlyTotals[createdYear][month] += item.totalPrice; // Sumar el totalPrice
      }
    });

    return monthlyTotals;
  };

  const monthlyData = groupByMonthAndYear(reservations);

  return (
    <div className="flex justify-center py-10 flex-col">
      <h1 className="w-full text-center text-3xl pb-10 font-semibold font-serif">
        Tablas de ganancias por mensualidad
      </h1>
      <div className="flex gap-4 justify-center">
        {Object.entries(monthlyData).map(([year, months]) => (
          <div key={year}>
            <h2 className="text-2xl font-semibold mb-4 text-center">{year}</h2>
            <table className="table-auto border-collapse border border-gray-300 mt-8">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 border border-gray-300">Meses</th>
                  <th className="px-4 py-2 border border-gray-300">
                    Total Ganado
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(months).map(([month, total], index) => (
                  <tr
                    className="odd:bg-white even:bg-gray-100 text-center"
                    key={`${year}-${month}`}
                  >
                    <td className="px-4 py-2 border border-gray-300">
                      {monthNames[parseInt(month)]}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {total} €
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
      <div>
        <h1 className="w-full text-center text-3xl pb-10 font-semibold font-serif py-10 justify-center">
          Tabla de ganancias por servicio
        </h1>
        <table className="table-auto border-collapse border border-gray-300 w-2/3 mx-auto ">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border border-gray-300">
                Nombre del Servicio
              </th>
              <th className="px-4 py-2 border border-gray-300">Total Ganado</th>
            </tr>
          </thead>
          <tbody>
            {res.map(({ name, total }, index) => {
              return (
                <tr
                  className="odd:bg-white even:bg-gray-100 text-center"
                  key={index}
                >
                  <td className="px-4 py-2 border border-gray-300">{name} </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {total} €
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin_Contabilidad;
