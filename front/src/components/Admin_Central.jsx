import useReservationStore from "../store/store";
import { format } from "date-fns";

const Admin_Central = ({ text }) => {
  const data = useReservationStore((state) => state[text]);
  const handleclick = () => {
    console.log("has clickado");
  };
  return (
    <div className=" min-h-96 mt-10">
      <div className="text-center w-9/12 mx-auto">
        <h1 className="text-3xl">Listado de {text}</h1>

        <table className="min-w-full table-auto border-collapse border border-gray-300 mt-10">
          <thead>
            <tr className="bg-gray-200">
              {text === "servicios" && (
                <>
                  <th className="px-4 py-2 border border-gray-300">
                    Nombre del Servicio
                  </th>
                  <th className="px-4 py-2 border border-gray-300">
                    Descripción
                  </th>
                  <th className="px-4 py-2 border border-gray-300">Plazas</th>
                  <th className="px-4 py-2 border border-gray-300">Precio</th>
                </>
              )}

              {text === "usuarios" && (
                <>
                  <th className="px-4 py-2 border border-gray-300">Nombre</th>
                  <th className="px-4 py-2 border border-gray-300">
                    Apellidos
                  </th>
                  <th className="px-4 py-2 border border-gray-300">Email</th>
                  <th className="px-4 py-2 border border-gray-300">Teléfono</th>
                  <th className="px-4 py-2 border border-gray-300">
                    Fecha suscripción
                  </th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((item, index) => {
                if (text === "servicios") {
                  const { name, prices, description, capacity, id } = item;
                  return (
                    <tr
                      key={id}
                      className="odd:bg-white even:bg-gray-100 text-center"
                    >
                      <td className="px-4 py-2 border border-gray-300">
                        {name}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {description}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {capacity}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {prices}
                      </td>
                    </tr>
                  );
                }
                if (text === "usuarios") {
                  const { name, username, email, phone, created_at } = item;
                  const formattedDate = format(created_at, "dd-MMM-yyyy");

                  return (
                    <tr
                      key={index}
                      className="odd:bg-white even:bg-gray-100 text-center"
                    >
                      <td className="px-4 py-2 border border-gray-300">
                        {name}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {username}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {email}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {phone}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {formattedDate}
                      </td>
                    </tr>
                  );
                }
              })
            ) : (
              <p>No hay datos que mostrar...</p>
            )}
          </tbody>
        </table>
        <div className="flex my-20 items-center gap-12">
          <h1>Añadir servicio</h1>
          <button
            onClick={handleclick}
            className="bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded-full"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin_Central;
