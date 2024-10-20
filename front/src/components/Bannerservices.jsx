import Service from "./Service";
import dataServicios from "../utils/data.js";

const BannerServices = () => {
  return (
    <div className="container-full my-10">
      <h1 className="text-center text-green-700 font-bold font-sans text-2xl">
        SERVICIOS
      </h1>
      <div className="bg-cyan-100 h-48 list-none flex gap-1 justify-between ">
        {dataServicios?.map((servicio) => (
          <Service key={servicio.id} servicio={servicio} />
        ))}
        aqui componentes servicios
      </div>
    </div>
  );
};

export default BannerServices;
