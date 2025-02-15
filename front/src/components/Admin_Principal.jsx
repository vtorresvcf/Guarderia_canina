const Admin_Principal = ({ data, text }) => {
  const totalItems = data?.length;
  return (
    <div>
      <div className="bg-white shadow-lg w-64 h-2/3 p-4 flex flex-col justify-around text-center font-thin">
        <h1 className="text-xl font-bold">Total de {text} </h1>
        <span className="text-3xl font-extrabold">{totalItems}</span>
      </div>
    </div>
  );
};

export default Admin_Principal;
