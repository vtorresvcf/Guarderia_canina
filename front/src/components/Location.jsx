import Map from "./Map";

const Location = () => {
  return (
    <div className="h-auto bg-green-900 text-white text-center py-7 ">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col items-center m-auto">
          <h1 className="text-4xl font-serif py-5">Donde estamos</h1>
          <p className="text-2xl">GuaToKa, S.L.</p>
          <p className="text-2xl">Calle de la Paz, 12 </p>
          <p className="text-2xl">46711 Miramar</p>
          <p className="text-2xl">Valencia, España</p>
        </div>
        <div className="py-5">
          <Map />
        </div>
      </div>
    </div>
  );
};

export default Location;
