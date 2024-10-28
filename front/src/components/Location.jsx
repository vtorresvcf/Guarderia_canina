const Location = () => {
  return (
    <div className="h-96 bg-green-900 text-white text-center">
      <h1 className="text-4xl font-serif py-9">Donde estamos</h1>
      <div className="grid grid-cols-2">
        <div>
          <p className="text-2xl">GuaToKa, S.L.</p>
          <p className="text-2xl">Calle de la Paz, 12 </p>
          <p className="text-2xl">46711 Miramar</p>
          <p className="text-2xl">Valencia, España</p>
        </div>
        <div>Maps</div>
      </div>
    </div>
  );
};

export default Location;
