const Service = ({ servicio }) => {
  const { imagen, titulo, descripcion } = servicio;
  return (
    <div className="w-48 bg-red-200 h-full flex flex-col justify-center items-center">
      <img className="rounded-4" src={imagen}></img>
      <h2>{titulo}</h2>
      <p>{descripcion}</p>
    </div>
  );
};

export default Service;
