import Service from "./Service";
import dataServicios from "../utils/data.js";

const BannerServices = () => {
  return (
    <div className="container mx-auto my-10 px-4">
      <h1 className="text-center text-green-700 font-bold text-xl font-serif md:text-3xl lg:text-4xl my-10 ">
        NUESTROS SERVICIOS
      </h1>
      <div className="mx-auto h-auto list-none grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {dataServicios?.map((servicio) => (
          <Service key={servicio.id} servicio={servicio} />
        ))}
      </div>
    </div>
  );
};

export default BannerServices;
