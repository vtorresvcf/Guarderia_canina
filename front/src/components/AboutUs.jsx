import Friends from "../assets/friends.jpg";
import "../index.css";

const AboutUs = () => {
  return (
    <div className="container h-[30rem] relative w-full  ">
      <div className="w-[50rem] px-16 py-12 text-center absolute left-1/3 ">
        <img className="object-cover" src={Friends}></img>
      </div>
      <div className="w-[30rem] h-[20rem] bg-[#91B09A] px-16 py-7 text-center absolute top-28 right-1/2">
        <h1 className="text-green-900 font-mono text-3xl mb-4 ">
          Sobre nosotros
        </h1>
        <p className="text-white">
          En GuaToCa, ofrecemos un entorno seguro y cariñoso donde tu perro
          puede jugar, socializar y relajarse mientras tú estás ocupado. Nuestro
          equipo de cuidadores apasionados y capacitados se asegura de brindar
          atención personalizada para que cada perro se sienta como en casa,
          adaptando nuestro cuidado a las necesidades y personalidad de tu
          mascota.
          <strong>
            ¡Visítanos y conoce el lugar ideal para tu peludo amigo!
          </strong>
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
