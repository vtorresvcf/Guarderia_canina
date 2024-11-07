import "../index.css";

import ServicesLeftBanner from "../components/ServicesLeftBanner";

const Services = () => {
  return (
    <>
      <div className=" py-4 min-h-max">
        <div className="w-full  text-5xl font-pacifico text-center text-green-700 py-4 ">
          Nuestros servicios
        </div>
        <ServicesLeftBanner />
      </div>
    </>
  );
};

export default Services;
