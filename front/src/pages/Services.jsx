import "../index.css";

import ServicesLeftBanner from "../components/ServicesLeftBanner";

const Services = () => {
  return (
    <>
      <div className=" relative py-4 min-h-[103rem]">
        <div className="w-full text-5xl font-pacifico text-center text-green-700 pb-20 underline ">
          Nuestros servicios
        </div>
        <ServicesLeftBanner />
      </div>
    </>
  );
};

export default Services;
