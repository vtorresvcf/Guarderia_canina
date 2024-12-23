import { useEffect } from "react";
import Perro from "../assets/dog-register.jpg";
import FormRegister from "../components/FormRegister";
import Logo from "../components/Logo";
import useReservationStore from "../store/store";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { message, register } = useReservationStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (register) {
      setTimeout(() => {
        navigate("/");
      }, 4000);
    }
  }, [register, navigate]);
  return (
    <div className="min-h-[60rem] flex items-center justify-center ">
      <div className="flex w-[90%] max-w-5xl  rounded-lg shadow-lg overflow-hidden divide-x divide-slate-200">
        <div className="w-1/2 bg-white border-2  rounded-lg flex flex-col p-6 ">
          <div className="flex justify-center items-center my-4">
            <Logo />
          </div>

          <div className="flex-grow">
            {message && (
              <div role="alert">
                <div
                  className={` ${
                    register === false ? "bg-red-600" : "bg-green-700"
                  }  text-center rounded text-white font-bold rounded-t px-4 py-2 my-2`}
                >
                  {message}
                </div>
              </div>
            )}
            <FormRegister />
          </div>
        </div>
        <div className="flex flex-col  justify-center items-center bg-white p-6 w-1/2">
          <h2 className="text-5xl pb-12 text-green-800 font-pacifico">
            Registro
          </h2>
          <img
            className="w-full h-96 border-none object-cover rounded-full "
            src={Perro}
            alt="imagen-perro"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
