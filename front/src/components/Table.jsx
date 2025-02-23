import { motion } from "framer-motion";

const slideUp = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
};

const Table = ({ title, schedules }) => {
  return (
    <motion.table
      variants={slideUp}
      initial="hidden"
      animate="visible"
      className="border-separate border border-green-600 border-spacing-2 rounded-lg shadow-md bg-green-100 w-full h-full min-h-[180px] min-w-[300px] flex-grow"
    >
      <thead className="h-full">
        <tr className="h-full">
          <th className="border border-green-400 bg-green-200 text-lg px-6 py-3 rounded-t-lg h-full">
            {title}
          </th>
        </tr>
      </thead>
      <tbody className="h-full">
        {schedules.map((schedule, index) => (
          <tr key={index} className="h-full">
            <td className="border border-green-400 px-6 py-3 text-center h-full">
              {schedule}
            </td>
          </tr>
        ))}
      </tbody>
    </motion.table>
  );
};

export default Table;
