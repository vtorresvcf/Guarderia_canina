import "../index.css";
import { motion } from "framer-motion";
import servicios from "../utils/dataPageService.js";

const ServicesLeftBanner = () => {
  return (
    <div className="h-auto min-h-[24rem]">
      {servicios.map((service, index) => {
        const Icon = service.icono;
        const impar = index % 2 !== 0;

        return (
          <div key={index} className="grid grid-cols-2 w-full">
            {impar ? (
              <>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    transition: { duration: 1, ease: "easeOut" },
                  }}
                  viewport={{ once: true, amount: 0.2 }}
                  className="text-center flex justify-center flex-col items-center text-verdeOscuro px-20 min-h-[24rem]"
                >
                  <Icon className="icon" />
                  <h1 className="text-3xl py-2">{service.titulo}</h1>
                  <p>{service.descripcion}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    transition: { duration: 1, ease: "easeOut" },
                  }}
                  viewport={{ once: true, amount: 0.2 }}
                  className="w-full m-auto"
                >
                  <img
                    className="object-cover w-[100%] h-80"
                    src={service.imagen}
                    alt={service.titulo}
                  />
                </motion.div>
              </>
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    transition: { duration: 1, ease: "easeOut" },
                  }}
                  viewport={{ once: true, amount: 0.2 }}
                  className="w-full m-auto"
                >
                  <img
                    className="object-cover w-[100%] h-72"
                    src={service.imagen}
                    alt={service.titulo}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    transition: { duration: 1, ease: "easeOut" },
                  }}
                  viewport={{ once: true, amount: 0.2 }}
                  className="text-center flex justify-center flex-col items-center text-verdeOscuro px-20 min-h-[24rem]"
                >
                  <Icon className="icon" />
                  <h1 className="text-3xl py-2">{service.titulo}</h1>
                  <p>{service.descripcion}</p>
                </motion.div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ServicesLeftBanner;
