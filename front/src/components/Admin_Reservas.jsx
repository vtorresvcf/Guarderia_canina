import { useState, useEffect } from "react";
import useReservationStore from "../store/store";

const Admin_Reservas = () => {
  const { reservations } = useReservationStore();

  const itemsPerPage = 20;

  const [filters, setFilters] = useState({
    textSearch: "", // Búsqueda por texto
    serviceFilter: "", // Filtro por servicio
    currentPage: 1, // Página actual
  });

  const [filteredData, setFilteredData] = useState({
    filteredReservations: [],
    paginatedReservations: [],
    totalPages: 0,
    totalItems: 0,
  });

  // Extraer servicios únicos
  const ServicesName = [
    ...new Set(reservations?.map((reserva) => reserva.serviceName)),
  ];

  // Actualizar el estado del filtrado cuando cambien los filtros o la página
  useEffect(() => {
    const searchText = filters.textSearch.toLowerCase();

    // Filtrar las reservas
    const filteredReservations =
      reservations?.filter((reserva) => {
        const { userName = "", serviceName = "" } = reserva;

        const matchesText =
          userName.toLowerCase().includes(searchText) ||
          serviceName.toLowerCase().includes(searchText);
        const matchesService =
          !filters.serviceFilter || serviceName === filters.serviceFilter;

        return matchesText && matchesService;
      }) || [];

    // Paginación
    const totalItems = filteredReservations.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (filters.currentPage - 1) * itemsPerPage;
    const paginatedReservations = filteredReservations.slice(
      startIndex,
      startIndex + itemsPerPage
    );

    // Actualizar el estado
    setFilteredData({
      filteredReservations,
      paginatedReservations,
      totalPages,
      totalItems,
    });
  }, [filters, reservations]);

  // Manejar cambios en los filtros
  const handleFiltersChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      currentPage: key === "currentPage" ? value : 1, // Reiniciar página si se cambia el texto o servicio
    }));
  };

  const goToNextPage = () => {
    if (filters.currentPage < filteredData.totalPages) {
      handleFiltersChange("currentPage", filters.currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (filters.currentPage > 1) {
      handleFiltersChange("currentPage", filters.currentPage - 1);
    }
  };

  return (
    <div className="mx-10 flex justify-center flex-col">
      <h1 className="text-center text-3xl py-12">Listado de reservas</h1>
      <div className="flex justify-center gap-10">
        {/* Filtro por texto */}
        <input
          type="text"
          placeholder="Filtrar por nombre"
          value={filters.textSearch}
          onChange={(e) => handleFiltersChange("textSearch", e.target.value)}
          className="mb-4 px-4 py-2 border border-gray-300 rounded-xl shadow-md w-1/3"
        />

        {/* Filtro por servicio */}
        <select
          value={filters.serviceFilter}
          onChange={(e) => handleFiltersChange("serviceFilter", e.target.value)}
          className={`mb-4 px-4 py-2 border border-gray-300 shadow-md rounded-xl w-1/3 ${
            filters.serviceFilter === "" ? "text-slate-400" : "text-black"
          }`}
        >
          <option value="" disabled className="text-slate-400">
            Filtrar por servicio
          </option>
          {ServicesName.map((service, index) => (
            <option value={service} key={index} className="text-black">
              {service}
            </option>
          ))}
        </select>
      </div>

      {/* Tabla de resultados */}
      {filteredData.paginatedReservations.length > 0 ? (
        <>
          <div className=" min-h-96 mt-10">
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 border border-gray-300">Usuario</th>
                  <th className="px-4 py-2 border border-gray-300">
                    Fecha Entrada
                  </th>
                  <th className="px-4 py-2 border border-gray-300">
                    Fecha Salida
                  </th>
                  <th className="px-4 py-2 border border-gray-300">
                    Nº Plazas
                  </th>
                  <th className="px-4 py-2 border border-gray-300">Precio</th>
                  <th className="px-4 py-2 border border-gray-300">Servicio</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.paginatedReservations.map((reserva, index) => {
                  const {
                    dateStart,
                    endDate,
                    places,
                    totalPrice,
                    serviceName,
                    userName,
                  } = reserva;
                  return (
                    <tr
                      key={index}
                      className="odd:bg-white even:bg-gray-100 text-center"
                    >
                      <td className="px-4 py-2 border border-gray-300">
                        {userName}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {dateStart}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {endDate}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {places}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {totalPrice} €
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {serviceName}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center items-center space-x-4 py-10">
            <button
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
              disabled={filters.currentPage === 1}
              onClick={goToPreviousPage}
            >
              Anterior
            </button>
            <span className="text-gray-700">
              Página {filters.currentPage} de {filteredData.totalPages}
            </span>
            <button
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
              disabled={filters.currentPage === filteredData.totalPages}
              onClick={goToNextPage}
            >
              Siguiente
            </button>
          </div>
        </>
      ) : (
        <div className="text-center py-4">
          No hay resultados para la búsqueda.
        </div>
      )}
    </div>
  );
};

export default Admin_Reservas;
