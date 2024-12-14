import Perro from "../assets/dog-login.jpg";
import FormLogin from "../components/FormLogin";
import Logo from "../components/Logo";

const Login = () => {
  return (
    <div className="min-h-[50rem] relative">
      <div className="w-[25rem] bg-white h-[45rem]  mx-auto my-12 border-2 border-green-500 rounded-lg ">
        <div className="bg-white h-1/5 justify-center  flex items-center rounded-lg ">
          <Logo />
        </div>
        <div className=" h-2/4">
          <FormLogin />
        </div>
        <div className=" h-1/4 ">
          <img
            className="w-full h-[50%] object-cover overflow-visible"
            src={Perro}
            alt="imagen-perro"
          ></img>
        </div>
      </div>
    </div>
  );
};

export default Login;