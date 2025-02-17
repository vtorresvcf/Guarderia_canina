import Service from "./Service";
import dataServicios from "../utils/data.js";
import { motion } from "framer-motion";

const BannerServices = () => {
  return (
    <div className="container mx-auto my-10 px-4">
      <h1 className="text-center text-green-700 font-bold text-xl font-serif md:text-3xl lg:text-4xl my-10">
        NUESTROS SERVICIOS
      </h1>
      <div className="mx-auto h-auto list-none grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        {dataServicios?.map((servicio) => (
          <motion.div
            key={servicio.id}
            className="service-card"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
            viewport={{ once: true }}
          >
            <Service servicio={servicio} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BannerServices;
