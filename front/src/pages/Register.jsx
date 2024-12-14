import Perro from "../assets/dog-register.jpg";
import FormRegister from "../components/FormRegister";
import Logo from "../components/Logo";

const Register = () => {
  return (
    <div className="min-h-[60rem] flex items-center justify-center ">
      <div className="flex w-[90%] max-w-5xl  rounded-lg shadow-lg overflow-hidden divide-x divide-slate-200">
        <div className="w-1/2 bg-white border-2  rounded-lg flex flex-col p-6 ">
          <div className="flex justify-center items-center my-4">
            <Logo />
          </div>

          <div className="flex-grow">
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
