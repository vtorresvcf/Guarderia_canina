import { useEffect, useState } from "react";
import Reservas from "../components/Reservas";
import useReservationStore from "../store/store";
import { TbMoodSadSquint } from "react-icons/tb";
import { Toaster } from "sonner";

const ConsultaReservas = () => {
  const { getReservas, reservations } = useReservationStore();
  const [filterType, setFilterType] = useState("all"); // "all", "week", "month", "year"
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // January is 0, so +1 for month index
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // current year

  useEffect(() => {
    getReservas();
  }, [getReservas]);

  // Filtrar las reservas según el tipo de filtro
  const filteredReservations = reservations
    ?.filter((reserva) => {
      const [day, month, year] = reserva.dateStart.split("-");
      const startDate = new Date(`${year}-${month}-${day}`);

      // Filtrar por año
      if (filterType === "year") {
        return startDate.getFullYear() === selectedYear;
      }

      // Filtrar por mes
      if (filterType === "month") {
        return startDate.getMonth() + 1 === selectedMonth; // Los meses son 0-indexed, por eso sumamos 1
      }

      // Mostrar todas las reservas si no se selecciona ningún filtro específico
      return true;
    })
    .sort((a, b) => {
      // Convertir las fechas en objetos Date para compararlas
      const [dayA, monthA, yearA] = a.dateStart.split("-");
      const [dayB, monthB, yearB] = b.dateStart.split("-");

      const dateA = new Date(`${yearA}-${monthA}-${dayA}`);
      const dateB = new Date(`${yearB}-${monthB}-${dayB}`);

      return dateA - dateB; // Orden ascendente (más antiguas primero)
    });

  return (
    <section className="min-h-[40rem] font-cedarville text-green-900">
      <h1 className="text-5xl text-center mt-10 ">Reservas</h1>
      <Toaster
        position="top-center"
        richColors
        toastOptions={{
          style: {
            marginTop: "150px",
            marginBottom: "50px",
            marginLeft: "380px",
            fontSize: "16px",
            maxWidth: "400px",
          },
        }}
      />
      <div className="text-center my-6">
        <button
          className={`px-4 py-2 mx-2 ${
            filterType === "all" ? "bg-green-700 text-white" : "bg-gray-300"
          }`}
          onClick={() => setFilterType("all")}
        >
          Todas
        </button>

        <button
          className={`px-4 py-2 mx-2 ${
            filterType === "month" ? "bg-green-700 text-white" : "bg-gray-300"
          }`}
          onClick={() => setFilterType("month")}
        >
          Mes
        </button>
        <button
          className={`px-4 py-2 mx-2 ${
            filterType === "year" ? "bg-green-700 text-white" : "bg-gray-300"
          }`}
          onClick={() => setFilterType("year")}
        >
          Año
        </button>
      </div>

      {/* Si el filtro es "month" o "year", mostrar el selector correspondiente */}
      {filterType === "month" && (
        <div className="flex justify-center space-x-4 mb-4">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            className="px-4 py-2"
          >
            {Array.from({ length: 12 }, (_, index) => (
              <option key={index} value={index + 1}>
                {new Date(0, index).toLocaleString("default", {
                  month: "long",
                })}
              </option>
            ))}
          </select>
        </div>
      )}

      {filterType === "year" && (
        <div className="flex justify-center space-x-4 mb-4">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="px-4 py-2"
          >
            <option value={2027}>2027</option>
            <option value={2026}>2026</option>
            <option value={2025}>2025</option>
          </select>
        </div>
      )}

      {filteredReservations && filteredReservations.length > 0 ? (
        <ul className="my-16">
          {filteredReservations?.map((reserva) => (
            <Reservas key={reserva.id} reserva={reserva} />
          ))}
        </ul>
      ) : (
        <div className="justify-center text-3xl my-16 text-red-600 flex">
          {filterType === "month" ? (
            <p>
              No tienes reservas para el mes de{" "}
              <span>
                {new Date(0, selectedMonth - 1).toLocaleString("default", {
                  month: "long",
                })}
              </span>{" "}
              del año <span>{selectedYear}</span>.
            </p>
          ) : filterType === "year" ? (
            <p>
              No tienes reservas para el año <span>{selectedYear}</span>.
            </p>
          ) : (
            <p>No tienes reservas...</p>
          )}
          <TbMoodSadSquint />
        </div>
      )}
    </section>
  );
};

export default ConsultaReservas;
