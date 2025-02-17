import Video from "../assets/play.mp4";
import { motion } from "framer-motion";

const Bannerphrase = () => {
  return (
    <div className="w-full h-[300px] flex items-center justify-center relative">
      <video
        src={Video}
        loop
        autoPlay
        muted
        className="w-full h-full object-cover"
      ></video>
      <motion.div className="absolute w-[50rem] text-white text-2xl font-bold text-center">
        <motion.h1
          className="font-sans"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          Crees que los perros no irán al cielo? Te digo, que ellos han estarán
          ahí mucho antes que cualquiera de nosotros.
        </motion.h1>
        <motion.h2
          className="py-7 italic font-light"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 3, ease: "easeInOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          Robert Louis Stevenson
        </motion.h2>
      </motion.div>
    </div>
  );
};

export default Bannerphrase;
