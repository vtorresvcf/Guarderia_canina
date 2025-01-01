import { GiDogHouse } from "react-icons/gi";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";
import useReservationStore from "../store/store";
const Reservas = ({ reserva }) => {
  const {
    serviceDescription,
    dateStart,
    endDate,
    places,
    created_at,
    totalPrice,
    id_reserva,
  } = reserva;

  const { deleteReserva } = useReservationStore();

  const handleDelete = (id) => {
    deleteReserva(id);
  };
  return (
    <article className="w-[75%] font-serif    mx-auto my-5">
      <h2 className="font-bold text-xl pb-4 text-green-700 ">
        Reserva: {dateStart} {dateStart !== endDate && `--- ${endDate}`}
      </h2>
      <li
        key={id_reserva}
        className=" border-spacing-3 py-10 rounded-md shadow-lg bg-white flex  "
      >
        <div className="w-1/5 flex justify-center items-center ml-10">
          <GiDogHouse className="text-9xl text-green-700" />
        </div>
        <div className="w-3/5 text-xl pl-14 ">
          <p className="font-bold">
            Servicio: <span className="font-normal">{serviceDescription}</span>
          </p>
          <p className="font-bold">
            Plazas:<span className="font-normal"> {places}</span>
          </p>

          <p className="font-bold">
            Fecha reserva: <span className="font-normal">{created_at}</span>
          </p>
          <p className="font-bold">
            Total:{" "}
            <span className="underline decoration-double decoration-green-700">
              {totalPrice} €
            </span>
          </p>
        </div>
        <div className="w-1/5 flex flex-col gap-11">
          <div className="text-2xl flex justify-around ">
            <FaEdit />
            <RiDeleteBin2Fill onClick={() => handleDelete(id_reserva)} />
          </div>
        </div>
      </li>
    </article>
  );
};

export default Reservas;
