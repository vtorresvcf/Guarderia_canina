import Logo from "../components/Logo";
import ImageService from "../assets/icon-admin-service.png";
import ImageContabilidad from "../assets/icon-admin-contabilidad.png";
import ImageReserva from "../assets/icon-admin-reserva.png";
import ImageUsers from "../assets/icon-admin-users.png";

const Admin_lateral = ({ selection, setSelection }) => {
  const sections = ["servicios", "reservas", "contabilidad", "usuarios"];
  const icons = [ImageService, ImageReserva, ImageContabilidad, ImageUsers];
  return (
    <div className="border border-white bg-black text-white min-w-60 w-1/4 flex flex-col ">
      <div className=" text-center items-center pt-14 flex lg:flex-col justify-center ">
        <div>
          <Logo color="white" />
        </div>
      </div>
      <div className="flex justify-center text-xl  h-96 items-center ">
        <ul className="w-full text-center">
          {sections.map((section, index) => (
            <li
              key={section}
              onClick={() => setSelection(section)}
              className={`flex justify-center gap-4 py-7 border border-white hover:text-slate-300 ${
                selection === section ? "text-yellow-400" : ""
              } cursor-pointer`}
            >
              <img
                className="w-7 filter brightness-0 invert "
                src={icons[index]}
                alt={`$(section) icon`}
              ></img>
              {section.toUpperCase()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Admin_lateral;
