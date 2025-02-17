import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

const Admin_Principal = ({ data, text }) => {
  const totalItems = data?.length;

  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    const animation = animate(count, totalItems, {
      duration: 2,
    });
  }, []);
  return (
    <div>
      <div className="bg-white shadow-lg w-64 h-2/3 p-4 flex flex-col justify-around text-center font-thin">
        <h1 className="text-xl font-bold">Total de {text} </h1>
        <motion.span className="text-3xl font-extrabold">{rounded}</motion.span>
      </div>
    </div>
  );
};

export default Admin_Principal;
