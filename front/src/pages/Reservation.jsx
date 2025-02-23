import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import SelectDates from "../components/SelectDates";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.2 } },
};

const slideInLeft = {
  hidden: { x: -200, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 1.2, ease: "easeOut" } },
};

const slideInRight = {
  hidden: { x: 200, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 1.2, ease: "easeOut" } },
};

const iconAnimation = {
  hidden: { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.8, delay: 0.6 } },
};

const Reservation = () => {
  return (
    <div className="min-h-96 py-2">
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="text-center"
      >
        <h1 className="text-6xl font-cedarville text-green-700 xl:text-7xl pt-5">
          Reserva online
        </h1>
      </motion.div>

      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="min-h-52"
      >
        <SelectDates />
      </motion.div>

      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="flex flex-row flex-wrap md:flex-nowrap justify-center text-center gap-4 mx-24 pb-40 text-green-700"
      >
        <motion.div
          variants={slideInLeft}
          initial="hidden"
          animate="visible"
          className="flex-1 border-double border-4 border-verdeOscuro p-8"
        >
          <h2 className="font-cedarville text-4xl mb-5 xl:text-5xl 2xl:text-6xl">
            Reservas por teléfono
          </h2>
          <p className="mb-4 lg:text-xl">
            Realiza tus reservas de manera rápida y sencilla llamando
            directamente a nuestro número de atención. Nuestro equipo estará
            encantado de asistirte y asegurarte la mejor experiencia.
          </p>
          <motion.div
            variants={iconAnimation}
            initial="hidden"
            animate="visible"
            className="flex justify-center gap-4 items-center text-2xl"
          >
            <FaPhoneAlt />
            <span>652216543</span>
          </motion.div>
        </motion.div>

        <motion.div
          variants={slideInRight}
          initial="hidden"
          animate="visible"
          className="flex-1 border-double border-4 border-verdeOscuro p-8"
        >
          <h2 className="font-cedarville text-4xl mb-5 xl:text-5xl 2xl:text-6xl">
            Reservas por correo
          </h2>
          <p className="mb-4 lg:text-xl">
            Realiza tus reservas de manera rápida y sencilla enviándonos un
            correo electrónico. Nuestro equipo estará encantado de ayudarte a
            asegurar tu lugar.
          </p>
          <motion.div
            variants={iconAnimation}
            initial="hidden"
            animate="visible"
            className="flex justify-center gap-4 items-center text-2xl"
          >
            <MdOutlineEmail />
            <span>guatoca@gmail.com</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Reservation;
