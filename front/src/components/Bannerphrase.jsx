import Video from "../assets/play.mp4";
import { motion } from "framer-motion";

const Bannerphrase = () => {
  const quoteVariants = {
    initial: { y: "-100vh", opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 1, ease: "easeInOut" },
    },
    exit: {
      y: "-100vh",
      opacity: 0,
      transition: { duration: 1, ease: "easeInOut" },
    },
  };

  return (
    <div className="w-full h-60 flex items-center justify-center relative">
      <video
        src={Video}
        loop
        autoPlay
        muted
        className="w-full h-full object-cover"
      ></video>
      <motion.div
        className="absolute w-[50rem] text-white text-2xl font-bold text-center"
        variants={quoteVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <h1 className="font-sans">
          Crees que los perros no irán al cielo? Te digo, que ellos han estarán
          ahí mucho antes que cualquiera de nosotros.
        </h1>
        <h2 className="py-7 italic font-light">Robert Louis Stevenson</h2>
      </motion.div>
    </div>
  );
};

export default Bannerphrase;
