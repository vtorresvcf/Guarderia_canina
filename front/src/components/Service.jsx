const Service = ({ servicio }) => {
  const { imagen, titulo, descripcion } = servicio;
  return (
    <div className=" flex flex-col justify-center items-center max-w-52 mx-auto">
      <img className="w-40 h-40 rounded-full " src={imagen}></img>
      <h2 className="my-2 text-green-700 font-mono font-semibold italic">
        {titulo}
      </h2>
      <p className="font-serif text-center">{descripcion}</p>
    </div>
  );
};

export default Service;
