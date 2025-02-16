import Friends from "../assets/friends.jpg";
import "../index.css";
import { motion } from "framer-motion";

const AboutUs = () => {
  const imageVariants = {
    initial: { x: "-100vw", opacity: 0 },
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 1, ease: "easeInOut" },
    },
    exit: {
      x: "100vw",
      opacity: 0,
      transition: { duration: 1, ease: "easeInOut" },
    },
  };

  const textVariants = {
    initial: { x: "100vw", opacity: 0 },
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 1, ease: "easeInOut" },
    },
    exit: {
      x: "-100vw",
      opacity: 0,
      transition: { duration: 1, ease: "easeInOut" },
    },
  };

  return (
    <div className="w-[90%] py-12 grid grid-cols-1 md:grid-cols-2 items-center mx-auto">
      <motion.img
        className="object-cover w-full mx-auto"
        src={Friends}
        alt="Imagen de amigos jugando con perros"
        variants={imageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      />
      <motion.div
        className="bg-[#91B09A] text-center p-6 shadow-md"
        variants={textVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <h1 className="text-green-900 font-mono text-3xl mb-4">
          Sobre nosotros
        </h1>
        <p className="text-white text-lg leading-relaxed">
          En GuaToCa, ofrecemos un entorno seguro y cariñoso donde tu perro
          puede jugar, socializar y relajarse mientras tú estás ocupado. Nuestro
          equipo de cuidadores apasionados y capacitados se asegura de brindar
          atención personalizada para que cada perro se sienta como en casa,
          adaptando nuestro cuidado a las necesidades y personalidad de tu
          mascota.
          <strong className="block mt-4">
            ¡Visítanos y conoce el lugar ideal para tu peludo amigo!
          </strong>
        </p>
      </motion.div>
    </div>
  );
};

export default AboutUs;
