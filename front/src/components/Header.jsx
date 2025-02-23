import Logo from "./Logo";
import "../index.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import useReservationStore from "../store/store";

const buttonVariants = {
  hover: { scale: 1.1, transition: { duration: 0.2 } },
  tap: { scale: 0.9 },
};

const menuVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

const Header = () => {
  const { logout, user } = useReservationStore();
  const [showText, setShowText] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowText(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <header className="fondo flex flex-col">
      <nav className="flex items-center py-6 justify-between text-white mx-auto w-full h-2/5">
        <div className="container mx-auto flex px-2">
          <div>
            <Logo color="white" />
          </div>
          <div className="w-full hidden md:flex">
            <div className="flex mx-auto">
              <ul className="flex items-center gap-5 mx-auto text-xl lg:text-3xl">
                <Link to="/">
                  <motion.li
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    Home
                  </motion.li>
                </Link>
                <Link to="/services">
                  <motion.li
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    Servicios
                  </motion.li>
                </Link>
                <Link to="/reservation">
                  <motion.li
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    Reservar
                  </motion.li>
                </Link>
                <Link to="/contact">
                  <motion.li
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    Contacto
                  </motion.li>
                </Link>
                {user && (
                  <Link to="/consultaReservas">
                    <motion.li
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      Reservas
                    </motion.li>
                  </Link>
                )}
              </ul>
            </div>
            <div className="flex gap-3 justify-center">
              {user ? (
                <>
                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="bn3637 bn36"
                  >
                    {user.name}
                  </motion.button>
                  <motion.button
                    onClick={logout}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="text-2xl border-x-white underline hover:font-bold"
                  >
                    Cerrar sesión
                  </motion.button>
                </>
              ) : (
                <>
                  <Link to="login">
                    <motion.button
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className="bn3637 bn36"
                    >
                      Login
                    </motion.button>
                  </Link>
                  <Link to="register">
                    <motion.button
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className="bn47"
                    >
                      Sign up
                    </motion.button>
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="relative items-center sm:hidden mx-auto">
            <motion.button
              type="button"
              className="text-white focus:outline-none"
              onClick={() => setOpenDropdown(!openDropdown)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg
                className="w-10 h-10"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {openDropdown && (
            <motion.ul
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={menuVariants}
              className="absolute top-20 right-10 bg-white text-black text-center md:hidden border rounded-xl p-2 shadow-md"
            >
              <Link to="/" onClick={() => setOpenDropdown(false)}>
                <li className="py-2 hover:bg-gray-200 rounded-md">Home</li>
              </Link>
              <Link to="/services" onClick={() => setOpenDropdown(false)}>
                <li className="py-2 hover:bg-gray-200 rounded-md">Servicios</li>
              </Link>
              <Link to="/reservation" onClick={() => setOpenDropdown(false)}>
                <li className="py-2 hover:bg-gray-200 rounded-md">Reservar</li>
              </Link>
              <Link to="/contact" onClick={() => setOpenDropdown(false)}>
                <li className="py-2 hover:bg-gray-200 rounded-md">Contacto</li>
              </Link>
              <div className="border-t-2 py-2">
                {user ? (
                  <>
                    <button
                      onClick={logout}
                      className="w-full py-2 px-4 text-center text-sm transition-all text-black hover:bg-gray-200 rounded-md"
                    >
                      Cerrar sesión
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="login" onClick={() => setOpenDropdown(false)}>
                      <button className="w-full py-2 px-4 text-center text-sm transition-all text-black hover:bg-gray-200 rounded-md">
                        Login
                      </button>
                    </Link>
                    <Link to="register" onClick={() => setOpenDropdown(false)}>
                      <button className="w-full py-2 px-4 text-center text-sm transition-all text-black hover:bg-gray-200 rounded-md">
                        Sign up
                      </button>
                    </Link>
                  </>
                )}
              </div>
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>
      <div className="flex justify-center pt-10 text-4xl">
        <AnimatePresence>
          {showText && (
            <motion.h2
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="text-white bg-gray-200/5 backdrop-blur-md px-6 py-4 rounded-lg inline-block"
            >
              Tu aventura comienza aquí !!!
            </motion.h2>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
