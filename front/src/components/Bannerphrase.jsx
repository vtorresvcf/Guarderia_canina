import Video from "../assets/play.mp4";

const Bannerphrase = () => {
  return (
    <div className=" my-20 w-full h-full relative">
      <video
        src={Video}
        loop
        autoPlay
        muted
        className="w-full max-h-80 object-cover"
      ></video>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-2xl font-bold text-center">
        <h1 className="font-sans">
          Crees que los perros no irán al cielo? Te digo, que ellos han estarán
          ahí mucho antes que cualquiera de nosotros.
        </h1>
        <h2 className="py-7  italic font-light">Robert Louis Stevenson</h2>
      </div>
    </div>
  );
};

export default Bannerphrase;
