import Logo from "./Logo";
import "../index.css";
import { useState } from "react";

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  return (
    <header className="fondo">
      <nav className="flex items-center flex-grow justify-between p-6 text-white">
        <div className="container mx-auto flex px-2">
          <div>
            <Logo />
          </div>
          <div className="flex flex-grow w-full hidden md:flex ">
            <div className="flex mx-auto">
              <ul className="flex items-center gap-5 mx-auto">
                <li>Home</li>
                <li>Servicios</li>
                <li>Reservar</li>
                <li>Contacto</li>
              </ul>
            </div>
            <div className="flex  gap-3 justify-center">
              <button className="bn3637 bn36">Login</button>
              <button className="bn47">Sign up</button>
            </div>
          </div>

          {/* Dropdown*/}
          <div className=" items-center sm:hidden mx-auto">
            <button
              type="button"
              className="text-white focus:outline-none"
              onClick={() => setOpenDropdown(!openDropdown)}
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
            </button>
          </div>
        </div>
        {/* Dropdown menu */}

        <ul
          className={`text-center md:hidden border rounded-xl p-1 transition-transform duration-500 ease-in-out ${
            openDropdown
              ? "transform translate-y-0 opacity-100"
              : "transform -translate-y-10 opacity-0"
          }`}
        >
          {openDropdown && (
            <>
              <li>Home</li>
              <li className="py-1">Servicios</li>
              <li>Reservar</li>
              <li className="py-1">Contacto</li>
              <div className="border-t-2 py-2">
                <button
                  className="rounded-md border border-transparent py-2 px-4 text-center text-sm transition-all text-white hover:bg-slate-100 hover:text-black focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                >
                  Login
                </button>
                <button
                  className="rounded-md border border-transparent py-2 px-4 text-center text-sm transition-all text-white hover:bg-slate-100 hover:text-black focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                >
                  Sign up
                </button>
              </div>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
