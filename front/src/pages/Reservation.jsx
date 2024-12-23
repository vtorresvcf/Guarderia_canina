import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import SelectDates from "../components/SelectDates";

const Reservation = () => {
  return (
    <div className="min-h-96 py-2">
      <div>
        <h1 className="text-center text-6xl font-cedarville text-green-700 xl:text-7xl pt-5 ">
          Reserva online
        </h1>
        <div className="min-h-52">
          <SelectDates />
        </div>
      </div>
      <div className="flex flex-row flex-wrap md:flex-nowrap justify-center text-center gap-4 mx-24 pb-40 ">
        <div className="flex-1 border-double border-4 border-verdeOscuro p-8 ">
          <h2 className="font-cedarville text-green-700 text-4xl mb-5 xl:text-5xl 2xl:text-6xl">
            Reservas por teléfono
          </h2>
          <p className="mb-4 lg:text-xl">
            Realiza tus reservas de manera rápida y sencilla llamando
            directamente a nuestro número de atención. Nuestro equipo estará
            encantado de asistirte y asegurarte la mejor experiencia.
          </p>
          <div className="flex justify-center gap-4 items-center text-2xl">
            <FaPhoneAlt />
            <span>652216543</span>
          </div>
        </div>
        <div className="flex-1 border-double border-4 border-verdeOscuro p-8">
          <h2 className="font-cedarville text-green-700 text-4xl mb-5 xl:text-5xl 2xl:text-6xl">
            Reservas por correo
          </h2>

          <p className="mb-4 lg:text-xl">
            Realiza tus reservas de manera rápida y sencilla llamando
            directamente a nuestro número de atención. Nuestro equipo estará
            encantado de asistirte y asegurarte la mejor experiencia.
          </p>
          <div className="flex justify-center gap-4 items-center text-2xl">
            <MdOutlineEmail />
            <span>guatoca@gmail.com</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
