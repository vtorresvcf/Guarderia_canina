import { useState, useEffect, useRef } from "react";
import useReservationStore from "../store/store";
import { format } from "date-fns";
import FormAddService from "./FormAddService";
import { Toaster } from "sonner";
import { TiDelete } from "react-icons/ti";
import GraficoServicios from "./GraficoServicios";

const Admin_Central = ({ text }) => {
  const data = useReservationStore((state) => state[text]);
  const { deleteService } = useReservationStore();
  const sectionRef = useRef(null);
  const [addService, setAddService] = useState(false);

  useEffect(() => {
    if (addService && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [addService]);

  const handleDelete = (id) => {
    deleteService(id);
    console.log("Has pulsado y el id para eliminar es: " + id);
  };

  return (
    <div className="min-h-96 mt-10">
      <div className="text-center flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold mb-6">Listado de {text}</h1>

        <div className="overflow-auto">
          <table className="table-auto border-collapse border border-gray-300 mt-8">
            <thead>
              <tr className="bg-gray-200">
                {text === "servicios" ? (
                  <>
                    <th className="px-4 py-2 border border-gray-300">Nombre</th>
                    <th className="px-4 py-2 border border-gray-300">
                      Descripción
                    </th>
                    <th className="px-4 py-2 border border-gray-300">Plazas</th>
                    <th className="px-4 py-2 border border-gray-300">Precio</th>
                    <th className="px-4 py-2 border border-gray-300">
                      Eliminar
                    </th>
                  </>
                ) : (
                  <>
                    <th className="px-4 py-2 border border-gray-300">Nombre</th>
                    <th className="px-4 py-2 border border-gray-300">
                      Apellidos
                    </th>
                    <th className="px-4 py-2 border border-gray-300">Email</th>
                    <th className="px-4 py-2 border border-gray-300">
                      Teléfono
                    </th>
                    <th className="px-4 py-2 border border-gray-300">
                      Fecha suscripción
                    </th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {data && data.length > 0 ? (
                data.map((item) => {
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
                        <td className="text-red-500 px-2 text-3xl flex justify-center items-center h-10">
                          <TiDelete
                            onClick={() => handleDelete(id)}
                            className="cursor-pointer"
                          />
                        </td>
                      </tr>
                    );
                  }
                  if (text === "usuarios") {
                    const { name, username, email, phone, created_at } = item;
                    const formattedDate = format(
                      new Date(created_at),
                      "dd-MMM-yyyy"
                    );
                    return (
                      <tr
                        key={item.id}
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
                  return null;
                })
              ) : (
                <tr>
                  <td
                    colSpan={text === "servicios" ? 5 : 5}
                    className="text-center py-4"
                  >
                    No hay datos que mostrar...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {text === "servicios" && (
          <>
            <div className="my-10 w-full flex justify-center">
              <button
                onClick={() => setAddService(!addService)}
                className="bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded-full"
              >
                {addService ? "-" : "+"}
              </button>
            </div>

            <div className="w-3/4 mx-auto">
              {addService ? (
                <div ref={sectionRef} className="w-full flex justify-center">
                  <FormAddService setAddService={setAddService} />
                </div>
              ) : (
                <GraficoServicios text="servicios" />
              )}
            </div>
          </>
        )}
        <div className="w-3/4 auto pt-10">
          {text === "usuarios" && <GraficoServicios text="usuarios" />}
        </div>
      </div>

      <Toaster
        position="top-center"
        richColors
        toastOptions={{
          style: {
            fontSize: "16px",
            maxWidth: "400px",
          },
        }}
      />
    </div>
  );
};

export default Admin_Central;
