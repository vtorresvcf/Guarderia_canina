import { motion } from "framer-motion";
import Table from "./Table";
import IconDog from "../assets/icon-dog.svg";

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

const scaleUp = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.6 } },
};

const BannerReserve = () => {
  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="bg-green-200 h-auto grid grid-cols-1 md:grid-cols-3 items-center mx-auto py-8 px-6"
    >
      <motion.div
        variants={scaleUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="col-span-1 flex justify-center md:justify-end"
      >
        <img className="max-h-[200px]" src={IconDog} alt="Dog Icon" />
      </motion.div>

      <div className="text-center h-full text-green-800 col-span-2 flex flex-col items-center">
        <h1 className="text-3xl font-bold my-4">Horario</h1>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          <Table
            title="Lunes a Sábado"
            schedules={["Mañanas: 9:30 a 13:00", "Tardes: 17:30 a 19:30"]}
          />
          <Table
            title="Domingos y Festivos"
            schedules={["Mañanas: 10:00 a 15:00", "Tardes: 17:00 a 19:00"]}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default BannerReserve;
