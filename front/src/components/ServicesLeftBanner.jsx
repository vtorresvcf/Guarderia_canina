import "../index.css";

import servicios from "../utils/dataPageService.js";

const ServicesLeftBanner = () => {
  return (
    <div className="h-72  min-h-[24rem] ">
      {servicios.map((service, index) => {
        const Icon = service.icono;
        const impar = index % 2 !== 0;
        return (
          <>
            <div key={index} className="grid grid-cols-2 w-full py-8">
              {impar ? (
                <>
                  <div className="text-center flex justify-center flex-col items-center text-verdeOscuro px-20">
                    <Icon className="icon" />

                    <h1 className="text-3xl py-2">{service.titulo}</h1>
                    <p>{service.descripcion}</p>
                  </div>
                  <div className="w-full m-auto ">
                    <img
                      className="object-cover w-[100%] h-72"
                      src={service.imagen}
                    ></img>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-full m-auto ">
                    <img
                      className="object-cover w-[100%] h-72"
                      src={service.imagen}
                    ></img>
                  </div>
                  <div className="text-center flex justify-center flex-col items-center text-verdeOscuro px-20">
                    <Icon className="icon" />

                    <h1 className="text-3xl py-2">{service.titulo}</h1>
                    <p>{service.descripcion}</p>
                  </div>
                </>
              )}
            </div>
          </>
        );
      })}
    </div>
  );
};

export default ServicesLeftBanner;
