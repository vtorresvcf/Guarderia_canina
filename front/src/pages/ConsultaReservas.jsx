import { useEffect, useState } from "react";
import Reservas from "../components/Reservas";
import useReservationStore from "../store/store";
import { TbMoodSadSquint } from "react-icons/tb";
import { Toaster } from "sonner";

const ConsultaReservas = () => {
  const { getReservas, reservations } = useReservationStore();
  const [filterType, setFilterType] = useState("all"); // "all", "week", "month"

  useEffect(() => {
    getReservas();
  }, [getReservas]);

  const reservasOrdenadas = reservations?.slice().sort((a, b) => {
    const dateStart = new Date(a.dateStart);
    const endDate = new Date(b.endDate);
    return dateStart - endDate;
  });

  // Filtrar las reservas según el filtro seleccionado
  const filteredReservations = reservasOrdenadas?.filter((reserva) => {
    const now = new Date();
    const startDate = new Date(reserva.dateStart);

    if (filterType === "week") {
      const oneWeekFromNow = new Date();
      oneWeekFromNow.setDate(now.getDate() + 7); // Fecha dentro de una semana
      return startDate >= now && startDate <= oneWeekFromNow;
    }

    if (filterType === "month") {
      const oneMonthFromNow = new Date();
      oneMonthFromNow.setMonth(now.getMonth() + 1); // Fecha dentro de un mes
      return startDate >= now && startDate <= oneMonthFromNow;
    }

    return true; // Mostrar todas las reservas si no hay filtro
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
            filterType === "week" ? "bg-green-700 text-white" : "bg-gray-300"
          }`}
          onClick={() => setFilterType("week")}
        >
          Próxima Semana
        </button>
        <button
          className={`px-4 py-2 mx-2 ${
            filterType === "month" ? "bg-green-700 text-white" : "bg-gray-300"
          }`}
          onClick={() => setFilterType("month")}
        >
          Próximo Mes
        </button>
      </div>
      {filteredReservations ? (
        <ul className="my-16">
          {filteredReservations?.map((reserva) => (
            <Reservas key={reserva.id} reserva={reserva} />
          ))}
        </ul>
      ) : (
        <div className="justify-center text-3xl my-16 text-red-600 flex">
          <p>No hay reservas disponibles... </p>
          <TbMoodSadSquint />
        </div>
      )}
    </section>
  );
};

export default ConsultaReservas;
