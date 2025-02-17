import Map from "./Map";
import { motion } from "framer-motion";

const Location = () => {
  return (
    <div className="h-auto bg-green-800 text-white text-center py-7">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <motion.div
          className="flex flex-col items-center m-auto"
          initial={{ opacity: 0, x: -200 }} // Empieza desde la izquierda con opacidad 0
          whileInView={{ opacity: 1, x: 0 }} // Deslízate a su posición original
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
          viewport={{ once: true }} // Solo cuando entra en vista
        >
          <h1 className="font-serif py-5 text-4xl lg:text-6xl">
            Donde estamos
          </h1>
          <p className="text-xl lg:text-3xl">GuaToKa, S.L.</p>
          <p className="text-xl lg:text-3xl">Calle de la Paz, 12</p>
          <p className="text-xl lg:text-3xl">46711 Miramar</p>
          <p className="text-xl lg:text-3xl">Valencia, España</p>
        </motion.div>

        <motion.div
          className="py-5"
          initial={{ opacity: 0, x: 200 }} // Empieza desde la derecha con opacidad 0
          whileInView={{ opacity: 1, x: 0 }} // Deslízate a su posición original
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
          viewport={{ once: true }} // Solo cuando entra en vista
        >
          <Map />
        </motion.div>
      </div>
    </div>
  );
};

export default Location;
